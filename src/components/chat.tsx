import React from "react";
import {
 Card,
 CardContent,
 CardFooter,
 CardHeader,
 CardTitle,
} from "./ui/card";
import { SendIcon, SettingsIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getRandomElement } from "@/lib/utils";

type Message = {
 role: "user" | "assistant";
 content: string;
};

const initialValue: Message[] = [
 {
  role: "assistant",
  content: "Hello! How can I help you today?",
 },
];

export default function Chat() {
 const [messages, setMessages] = React.useState<Message[]>(initialValue);
 const [input, setInput] = React.useState<string>("");
 const [loading, setLoading] = React.useState<boolean>(false);

 const placeholderOptions: string[] = [
  "Ask me anything...",
  "Chat with Plum 🤖",
  "Summarize this page 📄",
  "What's on this page? 👀",
  "Give me the key points ✨",
  "Break it down for me 🔍",
  "Quick summary, please! 🚀",
 ];

 function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (input.trim()) {
   setLoading(true);
   setInput("");
   setMessages((prevMessages) => [
    ...prevMessages,
    { role: "user", content: input },
   ]);

   chrome.runtime.sendMessage(
    {
     type: "USER_MESSAGE",
     payload: [...messages, { role: "user", content: input }],
    },
    async (response) => {
     console.log("response", response);
     if (chrome.runtime.lastError) {
      console.error("Message sending failed:", chrome.runtime.lastError);
     }
     if (response?.content) {
      setMessages((prevMessages) => [
       ...prevMessages,
       { role: "assistant", content: response.content },
      ]);
     }
    }
   );

   setLoading(false);
  }
 }

 function handleClearMessages() {
  setMessages(initialValue);
 }

 return (
  <main className="p-2 flex flex-col justify-center">
   <Card className="border-gray-300 rounded-xl shadow-md py-2 min-h-[96vh] gap-2">
    <CardHeader className="flex flex-row justify-between items-center h-8 px-2 border-b border-gray-300 pb-2">
     <CardTitle className="flex flex-row items-center space-x-1 select-none pointer-events-none">
      <img
       src="/public/icons/icon-128.png"
       alt="Extension logo"
       className="h-8"
      />
      <h1 className="font-semibold text-lg">Chat</h1>
     </CardTitle>

     <div className="flex flex-row items-center space-x-1">
      <Button
       variant="ghost"
       size="icon"
       className="h-8 w-8 p-1.5 cursor-pointer hover:bg-gray-200 group">
       <SettingsIcon className="transition-transform duration-200 ease-in-out group-active:scale-95" />
      </Button>
     </div>
    </CardHeader>

    <CardContent className="grow overflow-y-auto max-h-[calc(100vh-8rem)] px-2">
     {messages.map((message, index) => (
      <div
       key={index}
       className={`mb-4 ${
        message.role === "user" ? "text-right" : "text-left"
       }`}>
       <span
        className={`inline-block p-2 rounded-lg ${
         message.role === "user"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
        }`}>
        {message.content}
       </span>
      </div>
     ))}
    </CardContent>

    <CardFooter className="flex flex-row justify-between items-center h-8 px-2 border-t border-gray-300 pt-3">
     <form onSubmit={handleFormSubmit} className="flex w-full space-x-2">
      <Input
       type="text"
       name="message"
       autoComplete="off"
       value={input}
       onChange={(e) => setInput(e.target.value)}
       placeholder={getRandomElement(placeholderOptions)}
       className="flex-grow focus-visible:ring-gray-500 h-8"
       endIcon={SendIcon}
       disabled={loading}
      />
      <Button
       type="button"
       variant="ghost"
       size="icon"
       onClick={handleClearMessages}
       className="h-8 w-8 p-1.5 cursor-pointer hover:bg-gray-200 hover:text-red-500 group">
       <Trash2Icon className="transition-transform duration-200 ease-in-out group-active:scale-95" />
      </Button>
     </form>
    </CardFooter>
   </Card>
  </main>
 );
}
