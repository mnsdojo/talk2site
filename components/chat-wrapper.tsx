"use client";

import { useChat, Message as TMessage } from "ai/react";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Loader, Send } from "lucide-react";
import { Separator } from "./ui/separator";
import Messages from "./messages";

export default function ChatWrapper({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: TMessage[];
}) {
  const { isLoading, messages, handleInputChange, input, handleSubmit } =
    useChat({
      api: "/api/chat-stream",
      initialMessages,
      body: { sessionId },
    });

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 max-w-3xl mx-auto w-full p-4 flex flex-col">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-semibold text-foreground">talk2site</h1>
          <ModeToggle />
        </div>

        <Messages messages={messages} />

        <Separator className="my-2 bg-border/50" />

        <div className="p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              className="flex-grow"
              placeholder="Enter your message"
              value={input}
              onChange={handleInputChange}
            />
            <Button disabled={isLoading} size="icon" type="submit">
              {isLoading ? (
                <Loader className=" h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
