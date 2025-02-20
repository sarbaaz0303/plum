import React from "react";
import { X, Settings, Send, Trash2, ChevronDown, Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface Message {
 role: "user" | "assistant";
 content: string;
}

export default function Chat() {
 return (
  <main>
   <Textarea
    placeholder="Type your message..."
    className="flex-1"
   />
  </main>
 );
}
