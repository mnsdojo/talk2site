import ChatWrapper from "@/components/chat-wrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import React from "react";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reFormatUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component),
  );
  return decodedComponents.join("/");
}
const sessionId = "helo_there_bruh123";

async function Page({ params }: PageProps) {
  const formattedUrl = reFormatUrl({ url: params.url as string[] });
  const isAlreadyIndex = await redis.sismember("indexed-urls", formattedUrl);
  if (!isAlreadyIndex) {
    await ragChat.context.add({
      type: "html",
      source: formattedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });
    await redis.sadd("indexed-urls", formattedUrl);
  }

  return <ChatWrapper sessionId={sessionId} />;
}

export default Page;
