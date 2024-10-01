import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import React from "react";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

function Message({ content, isUserMessage }: MessageProps) {
  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto flex items-start gap-2.5">
        <div
          className={cn(
            "size-10 shrink-0 aspect-square rounded-full border flex justify-center items-center",
            {
              "border-zinc-700 bg-zinc-900 text-white": !isUserMessage,
              "bg-blue-950 border-blue-700 text-zinc-200": isUserMessage,
            }
          )}
        >
          {isUserMessage ? (
            <User className="size-5" />
          ) : (
            <Bot className="size-5" />
          )}
        </div>
        <div className="flex flex-col ml-6 w-full">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {isUserMessage ? "You" : "Website"}
            </span>
          </div>
          <p className="text-sm py-2 text-gray-800 dark:text-gray-300">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Message;
