"use client";
import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { CodeBlock, dracula, github } from "react-code-blocks";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { useTheme } from "next-themes";

interface ButtonCodeblockProps {
  code: string;
  lang: string;
}
function CodeDisplayBlock({ code, lang }: ButtonCodeblockProps) {
  const [isCopied, setisCopied] = useState(false);
  console.log(lang);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setisCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => {
      setisCopied(false);
    }, 1500);
  };
  const { theme } = useTheme();

  return (
    <div className="relative my-4 overflow-scroll overflow-x-scroll flex flex-col text-start">
      <Button
        onClick={copyToClipboard}
        variant="ghost"
        size={"icon"}
        className="h-5 w-5 absolute top-2 right-2"
      >
        {isCopied ? (
          <CheckIcon className="w-4 h-4 scale-100 transition-all" />
        ) : (
          <CopyIcon className="w-4 h-4 scale-100 transition-all" />
        )}
      </Button>
      <CodeBlock
        customStyle={
          theme === "dark"
            ? { background: "#2a2a2a" }
            : { background: "#fcfcfc" }
        }
        text={code}
        language="tsx"
        showLineNumbers={false}
        theme={theme === "dark" ? dracula : github}
      />
    </div>
  );
}

export default CodeDisplayBlock;
