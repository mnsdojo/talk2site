"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { ArrowRight, Globe } from "lucide-react";

export default function HeroSection() {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) return;

    try {
      // Validate URL
      new URL(url);
      // Handle URL submission here
      console.log("Submitted URL:", url);
    } catch (err) {
      console.error("Invalid URL", err);
    }
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 ">
      {/* Gradients */}
      <div
        aria-hidden="true"
        className="flex absolute -top-96 start-1/2 transform -translate-x-1/2 z-0"
      >
        <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
        <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl text-center mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Globe className="h-8 w-8 text-primary mr-2" />
            <p className="text-2xl font-semibold text-primary">talk2site</p>
          </div>

          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Chat with Any Website
            <br />
            Using AI
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            Enter any URL and start a conversation with the content. Get
            insights, summaries, and answers to your questions instantly.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <Input
              type="url"
              placeholder="Enter website URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow text-lg py-6"
              required
            />
            <Button type="submit" size="lg" className="whitespace-nowrap">
              Start Chat <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            Try it now - paste any URL and experience the magic!
          </p>
        </div>
      </div>
    </section>
  );
}
