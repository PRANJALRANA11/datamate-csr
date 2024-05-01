"use client"
import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const[fetched_datasets, setFetched_datasets] = useState([])
  const[code_output_text, set_code_output_text] = useState([])
  const[text_data, settext_data] = useState([])
  const [prompt_send, set_prompt] = useState("")
  const DataSetFetch = async ()=>{
    try {
      const response  =  await  axios.get('http://127.0.0.1:8000/search_datasets', {
        params: {
          dataset_name: text_data // Pass dataset_name as a query parameter
        }
      })
      setFetched_datasets(response.data.datasets)
      console.log(response.data.datasets)
    }
    catch (error) {
      console.error(error)
    }


  }

  const AddDataSet = async (url)=>{
    try {
      const response  =  await  axios.get('http://127.0.0.1:8000/load_dataset/', {
        params: {
          dataset_url: url // Pass dataset_name as a query parameter
        }
      })
      set_code_output_text(response.data)
      console.log(response)
    }
    catch (error) {
      console.error(error)
    }
  }

  const StartConversation = async (code_output,prompt)=>{
    try {
      const response  =  await  axios.get('http://127.0.0.1:8000/chat_with_data/', {
        params: {
          prompt: prompt,
          output:code_output.output,
          code:code_output.code // Pass dataset_name as a query parameter
        }
      })
      set_code_output_text(response.data)
      console.log(response)
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14 ">
      <Tabs defaultValue="chat" >
        <TabsList>
          <TabsTrigger className="lg:w-[450px] " value="chat" >
            Chat
          </TabsTrigger>
          <TabsTrigger className="lg:w-[450px]" value="load-data">
           Load Data
          </TabsTrigger>
        </TabsList>
        <TabsContent
         
          value="chat"
        >
          <div  className="bg-white lg:w-full h-[500px] rounded-lg">
            {/* text , output  */}
            <h1>Text {code_output_text.text}</h1>
            {code_output_text.output=="imageToSaved.png"?<img src="http://127.0.0.1:8000/static/imageToSaved.png" />: <h1>Output {code_output_text.output}</h1>}
          </div>
          <div className="grid w-full gap-2">
          <Textarea placeholder="Type your message here."  value={prompt_send}  onChange={(e)=>set_prompt(e.target.value)}/>
          <Button onClick={()=>StartConversation(code_output_text,prompt_send)}>Send message</Button>
        </div>
        </TabsContent>
        <TabsContent  value="load-data">
        <div  className="bg-white lg:w-full h-[500px] rounded-lg">
        {fetched_datasets.map((dataset, index) => (
          <div key={index} className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Image src="/icons/dataset.svg" width="24" height="24" alt="Dataset" />
              <Link target="_blank" href={dataset.fullurl}><span>{dataset.repo}</span></Link>
            </div>
            <Button onClick={()=>AddDataSet(dataset.fullurl)}>Add to Chat</Button>
            </div>
            ))}
          </div>
          <div className="grid w-full gap-2">
          <Textarea placeholder="Type your message here." value={text_data}  onChange={(e)=>settext_data(e.target.value)}/>
          <Button onClick={DataSetFetch}>Send message</Button>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
