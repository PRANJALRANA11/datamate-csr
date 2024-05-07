// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import Link from "next/link";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Home() {
//   const [fetched_datasets, setFetched_datasets] = useState([]);
//   const [code_output_text, set_code_output_text] = useState([]);
//   const [text_data, settext_data] = useState([]);
//   const [prompt_send, set_prompt] = useState("");
//   const [loading_fetch, setLoading_fetch] = useState(false);
//   const [loading_add, setLoading_add] = useState(false);
//   const [loading_send, setLoading_send] = useState(false);
//   const [selected_dataset_url, setSelected_dataset_url] = useState("");
//   const [selected_dataset_repo, setSelected_dataset_repo] = useState("");

//   const DataSetFetch = async () => {
//     try {
//       setLoading_fetch(true);
//       const response = await axios.get(
//         "https://top-jenica-healix-96dbffa5.koyeb.app/search_datasets",
//         {
//           params: {
//             dataset_name: text_data, // Pass dataset_name as a query parameter
//           },
//         }
//       );
//       setFetched_datasets(response.data.datasets);
//       console.log(response.data.datasets);
//       settext_data("");
//     } catch (error) {
//       settext_data("");
//       console.error(error);
//     } finally {
//       settext_data("");
//       setLoading_fetch(false);
//     }
//   };

//   const AddDataSet = async (url, index) => {
//     try {
//       setLoading_add({ ...loading_add, [index]: true });
//       const response = await axios.get(
//         "https://top-jenica-healix-96dbffa5.koyeb.app/load_dataset/",
//         {
//           params: {
//             dataset_url: url, // Pass dataset_name as a query parameter
//           },
//         }
//       );
//       // set_code_output_text(response.data);
//       toast("Dataset has been added successfully!");
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading_add({ ...loading_add, [index]: false });
//     }
//   };

//   const StartConversation = async (code_output, prompt) => {
//     try {
//       setLoading_send(true);
//       const response = await axios.get(
//         "https://top-jenica-healix-96dbffa5.koyeb.app/chat_with_data/",
//         {
//           params: {
//             prompt: prompt,
//             output: code_output.output,
//             code: code_output.code, // Pass dataset_name as a query parameter
//           },
//         }
//       );
//       set_code_output_text(response.data);
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading_send(false);
//       set_prompt("");
//     }
//   };

//   return (
//     <>
//       <div className="flex">
//         <div className="ml-10 mt-5 w-[25rem] h-[45rem] rounded-xl bg-zinc-900">
//           <input
//             placeholder="Search your data"
//             value={text_data}
//             className="outline-none w-[20rem] ml-7 mt-10 h-[2.5rem] rounded-lg p-4 bg-neutral-600 text-[#959595]"
//             onChange={(e) => settext_data(e.target.value)}
//           />
//           <h1 className="ml-5 mt-10 text-white text-xl">Datasets</h1>
//           {fetched_datasets.map((dataset, index) => (
//             <div
//               key={index}
//               className=" w-[22rem]  ml-7 mt-5 h-[3.5rem] bg-neutral-600 rounded-lg  border-l-4 border-blue-500 text-white flex  p-4"
//             >
//               <p className="">
//                 {dataset.repo.substring(dataset.repo.lastIndexOf("/") + 1)}
//               </p>
//               <button
//                 onClick={() => {
//                   AddDataSet(dataset.fullurl, index);
//                   setSelected_dataset_url(dataset.fullurl);
//                   setSelected_dataset_repo(dataset.repo);
//                 }}
//                 disabled={loading_add[index]}
//                 className="ml-5 bg-blue-500 text-white rounded-lg w-20"
//               >
//                 {loading_add[index] ? "Loading..." : "Add Data"}
//               </button>
//             </div>
//           ))}

//           <button
//             onClick={DataSetFetch}
//             className="w-[20rem] ml-7 mt-10 h-[2.5rem] rounded-lg bg-blue-500 text-white"
//             disabled={loading_fetch}
//           >
//             {loading_fetch ? "loading..." : "Search Datasets"}
//           </button>
//         </div>
//         <div className=" ml-10 mt-5 h-[45rem] w-[65rem] bg-zinc-900 rounded-3xl overflow-auto">
//           <div className="flex">
//             <div className="text-white text-2xl ml-5 mt-5">
//               {selected_dataset_repo}
//             </div>
//             <div className="text-white flex  ml-[15rem] mt-5">
//               <Link
//                 href={selected_dataset_url}
//                 target="_blank"
//                 className="hover:cursor-pointer mr-10 hover:text-blue-500"
//               >
//                 Inspect data
//               </Link>
//               <Link
//                 href="http://127.0.0.1:8000/static/my_notebook.ipynb"
//                 target="_blank"
//                 className="hover:cursor-pointer hover:text-blue-500"
//               >
//                 Export File
//               </Link>{" "}
//               <svg
//                 class="w-6 h-6 text-gray-800 ml-2 dark:text-white"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   stroke="white"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
//                 />
//               </svg>
//             </div>
//           </div>
//           <div className="flex text-white">
//             <div className="ml-[14rem] mt-[5rem] ">
//               <img
//                 src="https://github.com/shadcn.png"
//                 alt="@shadcn"
//                 className="rounded-[40rem] w-14 h-14"
//               />
//             </div>
//             <div className="mt-[5.5rem] ml-3 text-2xl font-bold">YOU</div>
//           </div>
//           <p className="ml-[18.3rem] text-[1.5rem] text-white">{prompt_send}</p>
//           <div className="flex text-white">
//             <div className="ml-[14rem] mt-[5rem] ">
//               <img
//                 src="https://github.com/shadcn.png"
//                 alt="@shadcn"
//                 className="rounded-[40rem] w-14 h-14"
//               />
//             </div>
//             <div className="mt-[5.5rem] ml-3 text-2xl font-bold text-green-400">
//               Datamate
//             </div>
//           </div>
//           <p className="ml-[18.3rem] text-[1.5rem] text-white">
//             {code_output_text.text}
//           </p>
//           <div className="ml-[18.3rem] mt-5 w-[40rem] h-[10rem] bg-teal-200 rounded-lg text-[1.5rem] p-4 text-pink-400 overflow-auto">
//             {code_output_text.output == "imageToSaved.png" ? (
//               <img src="http://127.0.0.1:8000/static/imageToSaved.png" />
//             ) : (
//               <span>
//                 <h1>Output :</h1> <code> {code_output_text.output}</code>
//               </span>
//             )}
//           </div>
//           <div className="flex mt-40 ml-40">
//           <input
//             value={prompt_send}
//             onChange={(e) => set_prompt(e.target.value)}
//             placeholder="Let's Chat"
//             className="outline-none w-[42rem]  h-[2.5rem] rounded-lg p-4 bg-white text-black"
//           />
//           <button
//             className="ml-2 bg-blue-500 pl-7  rounded-lg w-20 h-[2.5rem] text-white"
//             onClick={() => StartConversation(code_output_text, prompt_send)}
//             disabled={loading_send}
//           >
//             {loading_send ? (
//               "Loading..."
//             ) : (
//               <svg
//                 class="w-6 h-6 text-gray-800 dark:text-white"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   stroke="white"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M19 12H5m14 0-4 4m4-4-4-4"
//                 />{" "}
//               </svg>
//             )}
//           </button>
//           </div>
//           <ToastContainer />
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "../components/ui/skeleton";
import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
  Search,
} from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import axios from "axios";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";
import Link from "next/link";
 
export default function Home() {
  const [dfHead, setDfHead] = useState([]);
  const [dfHead2, setDfHead2] = useState([]);
  const [dfHead3, setDfHead3] = useState([]);
  const [fetched_datasets, setFetched_datasets] = useState([]);
  const [code_output_text, set_code_output_text] = useState([]);
  const [text_data, settext_data] = useState([]);
  const [prompt_send, set_prompt] = useState("");
  const [loading_fetch, setLoading_fetch] = useState(false);
  const [loading_add, setLoading_add] = useState(false);
  const [loading_add1, setLoading_add1] = useState(false);
  const [loading_add2, setLoading_add2] = useState(false);
  const [loading_add3, setLoading_add3] = useState(false);
  const [loading_send, setLoading_send] = useState(false);
  const [sender_msg, set_sender_msg] = useState("");
  const [recieve_msg, set_recieve_msg] = useState("");
  const [selected_dataset_url, setSelected_dataset_url] = useState("");
  const [selected_dataset_repo, setSelected_dataset_repo] = useState("");



  const DataSetFetch = async (e) => {
    e.preventDefault();
    setLoading_add1(false);
    try {
      setLoading_fetch(true);
      const response = await axios.get(
        // "https://top-jenica-healix-96dbffa5.koyeb.app/search_datasets",
        "http://localhost:8000/search_datasets",
        {
          params: {
            dataset_name: text_data, // Pass dataset_name as a query parameter
          },
        }
      );
      setFetched_datasets(response.data.datasets);
      console.log(response.data.datasets);
      settext_data("");
    } catch (error) {
      settext_data("");
      console.error(error);
    } finally {
      settext_data("");
      setLoading_fetch(false);
    }
  };
  const AddDataSet = async (url, index) => {
    try {
      setLoading_add({ ...loading_add, [index]: true });
      toast("Dataset is being added!");
      const response = await axios.get(
        // "https://top-jenica-healix-96dbffa5.koyeb.app/load_dataset/",
        "http://localhost:8000/load_dataset/",
        {
          params: {
            dataset_url: url, // Pass dataset_name as a query parameter
          },
        }
      );
      set_code_output_text(response.data);
      Organizing_head(response.data.output);
      setLoading_add1(true);
      toast("Dataset has been added successfully!");
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading_add({ ...loading_add, [index]: false });
    }
  };
  const StartConversation = async (code_output, prompt) => {
    try {
      setLoading_send(true);
      set_sender_msg(prompt);
      const response = await axios.get(
        // "https://top-jenica-healix-96dbffa5.koyeb.app/chat_with_data/",
        "http://localhost:8000/chat_with_data/",
        {
          params: {
            prompt: prompt,
            output: code_output.output,
            code: code_output.code, // Pass dataset_name as a query parameter
          },
        }
      );
      set_code_output_text(response.data);
      setLoading_add3(true);
      set_recieve_msg(response.data.text);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading_send(false);
      set_prompt("");
    }
  };

  const Organizing_head = (data) => {
    const myArray = data.split("\n"); // Splitting data by newline

    // Log the header row first
    const headerRowData = myArray[0].split(" ");
    const filteredHeaderRowData = headerRowData.filter((item) => item !== ""); // Filter out empty strings
    // console.log(filteredHeaderRowData); // Log the filtered header row data

    let filteredRowData = [];
    // Loop through data starting from index 1 to skip the header row
    for (let i = 1; i < myArray.length; i++) {
      const rowData = myArray[i].split(" ");
      let filteredRowData_each = rowData.filter((item) => item !== "");
      filteredRowData_each.splice(0, 1);
      setDfHead3(filteredRowData_each);
      filteredRowData.push(filteredRowData_each);
    }
    setDfHead(filteredHeaderRowData);
    setDfHead2(filteredRowData);

    return filteredRowData;
  };
  return (
    <div className="grid h-screen w-full pl-[53px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="Playground"
                >
                  <SquareTerminal className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Playground
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Help"
                >
                  <LifeBuoy className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Help
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Account"
                >
                  <SquareUser className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Account
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Datamate</h1>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5"  />
            <Link href="http://localhost:8000/static/notebook.html" target="_blank">
            Share
            </Link>
          </Button>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            <div className="w-full items-start ">
              <fieldset className=" rounded-lg border h-[42rem] p-4 ">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  playground
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="data">Dataset</Label>
                  <div className="flex-1" />
                  <div
                    className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                    x-chunk="dashboard-03-chunk-1"
                  >
                    <Label htmlFor="message" className="sr-only">
                      Message
                    </Label>

                    <div className="flex  p-2 pt-0">
                      <Textarea
                        id="message"
                        placeholder="Search for you dataset ..."
                        className="min-h-12 resize-none border-0  shadow-none focus-visible:ring-0"
                        onChange={(e) => settext_data(e.target.value)}
                        value={text_data}
                      />

                      <Button
                        size="sm"
                        className="mt-3 ml-auto gap-1.5"
                        onClick={DataSetFetch}
                        disabled={loading_fetch}
                      >
                        {loading_fetch ? "loading ..." : "Search"}
                        <CornerDownLeft className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-[30rem] overflow-y-auto">
                    {loading_add1 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {dfHead.map((item, index) => (
                              <TableHead key={index}>{item}</TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dfHead2.map((items, index) => (
                            <TableRow
                              key={index}
                              className="hover:cursor-pointer"
                            >
                              {dfHead3.map((item, index) => (
                                <TableCell key={index} >
                                  <div className="font-medium ">{items[index]}</div>
                                </TableCell>
                               ))} 
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Dataset</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="overflow-auto">
                          {fetched_datasets.map((dataset, index) => (
                            <TableRow
                              onClick={() => {
                                AddDataSet(dataset.fullurl, index);
                                setSelected_dataset_url(dataset.fullurl);
                                setSelected_dataset_repo(dataset.repo);
                              }}
                              key={index}
                              className="hover:cursor-pointer"
                            >
                              {loading_add[index] ? (
                                <Skeleton className="w-[370px] h-[50px] " />
                              ) : (
                                <TableCell>
                                  <div className="font-medium ">
                                    {dataset.repo}
                                  </div>
                                  <div className="hidden text-sm text-muted-foreground md:inline">
                                    {dataset.subpath}
                                  </div>
                                </TableCell>
                              )}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div className="relative flex  max-h-[90vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 ">
            <div className="overflow-auto">
            {loading_add2 ? (
              <div>
                <Badge variant="outline" className="absolute right-3 top-3">
                  Output
                </Badge>
                <div class="flex items-start gap-2.5 mt-12 ml-4">
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://github.com/shadcn.png"
                    alt="Jese image"
                  />
                  <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-[#262626]">
                    <div class="flex items-center space-x-2 rtl:space-x-reverse">
                      <span class="text-sm font-semibold text-gray-900 dark:text-white">
                        You
                      </span>
                    </div>
                    <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                      {sender_msg}
                    </p>
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Delivered
                    </span>
                  </div>
                </div>{" "}
              </div>
            ) : null}

            {loading_add3 ? (
              <div class="flex items-start gap-2.5 mt-20 ml-4 ">
                <Triangle className="size-8 rounded-full fill-foreground" />
                <div class="flex flex-col gap-1 overflow-hidden">
                  <div class="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-[#22c55e]">
                    <div class="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                      <span class="text-sm font-semibold text-gray-900 dark:text-white">
                        Datamate
                      </span>
                    </div>
                    <p class="text-sm font-normal text-gray-900 dark:text-white">
                      {recieve_msg}
                    </p>
                    <div class="group relative my-2.5">
                      <div class="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <HoverCard>
                          <HoverCardTrigger>
                            {" "}
                            <button
                              data-tooltip-target="download-image"
                              class="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
                            >
                              <svg
                                class="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"
                                />
                              </svg>
                            </button>
                          </HoverCardTrigger>
                          <HoverCardContent className="overflow-auto">

                              {" "}
                              <code>{code_output_text.code}</code>{" "}
                          </HoverCardContent>
                        </HoverCard>
                        <div
                          id="download-image"
                          role="tooltip"
                          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        >
                          Download image
                          <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                      </div>
                      {code_output_text.output == "imageToSaved.png" ? (
                        <img src="http://127.0.0.1:8000/static/imageToSaved.png" />
                      ) : (
                        <span>
                          <h1>Output :</h1>{" "}
                          <code> {code_output_text.output}</code>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
</div>
            <div className="flex-1" />
            <div
              className="relative  rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              x-chunk="dashboard-03-chunk-1"
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                value={prompt_send}
                onChange={(e) => {
                  set_prompt(e.target.value);
                }}
              />
              <div className="flex items-center p-3 pt-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  size="sm"
                  className="ml-auto gap-1.5"
                  onClick={() => {
                    StartConversation(code_output_text, prompt_send);
                    setLoading_add2(true);
                  }}
                  disabled={loading_send}
                >
                  {loading_send ? "loading..." : "Send Message"}
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
          <ToastContainer />
        </main>
      </div>
    </div>
  );
}
