"use client";
import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [fetched_datasets, setFetched_datasets] = useState([]);
  const [code_output_text, set_code_output_text] = useState([]);
  const [text_data, settext_data] = useState([]);
  const [prompt_send, set_prompt] = useState("");
  const [loading_fetch, setLoading_fetch] = useState(false);
  const [loading_add, setLoading_add] = useState(false);
  const [loading_send, setLoading_send] = useState(false);
  const [selected_dataset_url, setSelected_dataset_url] = useState("");
  const [selected_dataset_repo, setSelected_dataset_repo] = useState("");



  const DataSetFetch = async () => {
    try {
      setLoading_fetch(true);
      const response = await axios.get(
        "http://127.0.0.1:8000/search_datasets",
        {
          params: {
            dataset_name: text_data, // Pass dataset_name as a query parameter
          },
        }
      );
      setFetched_datasets(response.data.datasets);
      console.log(response.data.datasets);
      settext_data("")
    } catch (error) {
      settext_data("")
      console.error(error);
    }finally{
      settext_data("")
      setLoading_fetch(false);
    }
  };

  const AddDataSet = async (url,index) => {
    try {
      setLoading_add({ ...loading_add, [index]: true });
      const response = await axios.get("http://127.0.0.1:8000/load_dataset/", {
        params: {
          dataset_url: url, // Pass dataset_name as a query parameter
        },
      });
      set_code_output_text(response.data);
      toast("Dataset has been added successfully!")
      console.log(response);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading_add({ ...loading_add, [index]: false });
    }
  };

  const StartConversation = async (code_output, prompt) => {
    try {
      setLoading_send(true);
      const response = await axios.get(
        "http://127.0.0.1:8000/chat_with_data/",
        {
          params: {
            prompt: prompt,
            output: code_output.output,
            code: code_output.code, // Pass dataset_name as a query parameter
          },
        }
      );
      set_code_output_text(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading_send(false);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="ml-10 mt-5 w-[25rem] h-[46rem] rounded-xl bg-zinc-900">
          <input
            placeholder="Search your data"
            value={text_data}
            className="outline-none w-[22rem] ml-5 mt-10 h-[2.5rem] rounded-lg p-4 bg-neutral-600 text-[#959595]"
            onChange={(e) => settext_data(e.target.value)}
          />
          <h1 className="ml-5 mt-10 text-white text-xl">Datasets</h1>
          {fetched_datasets.map((dataset, index) => (
            <div
              key={index}
              className=" w-[22rem]  ml-5 mt-5 h-[3.5rem] bg-neutral-600 rounded-lg  border-l-4 border-blue-500 text-white flex  p-4"
            >
              <p className="">
                {dataset.repo.substring(dataset.repo.lastIndexOf("/") + 1)}
              </p>
              <button
                onClick={() =>{ AddDataSet(dataset.fullurl,index);setSelected_dataset_url(dataset.fullurl);setSelected_dataset_repo(dataset.repo)}}
                disabled = {loading_add[index]}
                className="ml-5 bg-blue-500 text-white rounded-lg w-20"
              >
                {loading_add[index] ? "Loading..." : "Add Data"}
              </button>
            </div>
          ))}

          <button
            onClick={DataSetFetch}
            className="w-[22rem] ml-5 mt-10 h-[2.5rem] rounded-lg bg-blue-500 text-white"
            disabled={loading_fetch}
          >
            {loading_fetch ? "loading..." : "Search Datasets"}
          </button>
        </div>
        <div className=" ml-10 mt-5 h-[46rem] w-[75rem] bg-zinc-900 rounded-3xl overflow-auto">
          <div className="flex">
            <div className="text-white text-2xl ml-5 mt-5">{selected_dataset_repo}</div>
            <div className="text-white flex  ml-[25rem] mt-5">
              <Link href={selected_dataset_url} target="_blank" className="hover:cursor-pointer mr-10">Inspect data</Link>
              <Link href="http://127.0.0.1:8000/static/my_notebook.ipynb" target="_blank" className="hover:cursor-pointer">Export File</Link>{" "}  
              <svg
                class="w-6 h-6 text-gray-800 ml-2 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
                />
              </svg>
            </div>
          </div>
          <div className="flex text-white">
            <div className="ml-[14rem] mt-[5rem] ">
              <img
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="rounded-[40rem] w-14 h-14"
              />
            </div>
            <div className="mt-[5.5rem] ml-3 text-2xl font-bold">YOU</div>
          </div>
          <p className="ml-[18.3rem] text-[1.5rem] text-white">
            {prompt_send}
          </p>
          <div className="flex text-white">
            <div className="ml-[14rem] mt-[5rem] ">
              <img
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="rounded-[40rem] w-14 h-14"
              />
            </div>
            <div className="mt-[5.5rem] ml-3 text-2xl font-bold text-green-400">
              Datamate
            </div>
          </div>
          <p className="ml-[18.3rem] text-[1.5rem] text-white">
          {code_output_text.text}
          </p>
          <div className="ml-[18.3rem] mt-5 w-[40rem] h-[10rem] bg-teal-200 rounded-lg text-[1.5rem] p-4 text-pink-400 overflow-auto">
          {code_output_text.output == "imageToSaved.png" ? (
                <img src="http://127.0.0.1:8000/static/imageToSaved.png" />
              ) : (
               <span><h1>Output :</h1> <h2> {code_output_text.output}</h2></span> 
              )}
          </div>
          <input
            value={prompt_send}
            onChange={(e) => set_prompt(e.target.value)}
            placeholder="Let's Chat"
            className="outline-none w-[42rem] ml-60 mt-20 h-[2.5rem] rounded-lg p-4 bg-white text-black"
          />
          <button
            className="ml-2 bg-blue-500 pl-7  rounded-lg w-20 h-[2.5rem]"
            onClick={() => StartConversation(code_output_text, prompt_send)}
            disabled={loading_send}
          >
            {loading_send ? "Loading..." :<svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />             </svg>}
          </button>
          <ToastContainer />
        </div>
      </div>

     
    </>
  );
}
