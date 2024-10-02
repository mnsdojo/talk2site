"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { ArrowRight, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [url, setUrl] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) return;

    try {
      const urlToValidate = url.startsWith("http") ? url : `https://${url}`;
      const validated = new URL(urlToValidate);
      const encodedUrl = encodeURIComponent(validated.toString());
      router.push(`/${encodedUrl}`);
    } catch (err) {
      console.error("Invalid URL:", err);
      // Consider adding user feedback for invalid URLs
    }
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Gradients */}
      <div
        aria-hidden="true"
        className="absolute -top-96 start-1/2 transform -translate-x-1/2 z-0 flex"
      >
        <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
        <div className="bg-gradient-to-tl from-primary-foreground via-primary-foreground to-background blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem]" />
      </div>

      <div className="container relative z-10 mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex items-center justify-center">
            <Globe className="mr-2 h-8 w-8 text-primary" />
            <p className="text-2xl font-semibold text-primary">talk2site</p>
          </div>

          <h1 className="mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Chat with Any Website
            <br />
            Using AI
          </h1>

          <p className="mb-8 text-xl text-muted-foreground">
            Enter any URL and start a conversation with the content. Get
            insights, summaries, and answers to your questions instantly.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto flex flex-col gap-4 sm:flex-row px-4 sm:px-6"
          >
            <Input
              type="url"
              placeholder="Enter website URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className=" py-6 text-lg  "
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
