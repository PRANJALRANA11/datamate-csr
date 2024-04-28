"use client"
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Home() {
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
          hello
          </div>
          <div className="grid w-full gap-2">
          <Textarea placeholder="Type your message here." />
          <Button>Send message</Button>
        </div>
        </TabsContent>
        <TabsContent  value="load-data">
        <div  className="bg-white lg:w-full h-[500px] rounded-lg">
          hell
          </div>
          <div className="grid w-full gap-2">
          <Textarea placeholder="Type your message here." />
          <Button>Send message</Button>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
