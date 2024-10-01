"use client";

import { useChat } from "ai/react";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { ScrollArea } from "./ui/scroll-area";
import { Send } from "lucide-react";
import { Separator } from "./ui/separator";

export default function ChatWrapper({ sessionId }: { sessionId: string }) {
  const { messages, handleInputChange, input, handleSubmit } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 max-w-3xl mx-auto w-full p-4 flex flex-col">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-semibold text-foreground">talk2site</h1>
          <ModeToggle />
        </div>

        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-gray-500">No messages yet</h1>
          </div>
        ) : (
          <ScrollArea className="flex-1 overflow-auto p-4 space-y-4 backdrop-blur-sm bg-background/30">
            {/* {messages.map((msg, index) => (
              <div key={index} className="p-2 rounded bg-background">
              </div>
            ))} */}
            {JSON.stringify(messages)}
          </ScrollArea>
        )}

        <Separator className="my-2 bg-border/50" />

        <div className="p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              className="flex-grow"
              placeholder="Enter your message"
              value={input}
              onChange={handleInputChange}
            />
            <Button size="icon" type="submit">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
