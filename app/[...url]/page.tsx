import { cookies } from "next/headers";
import ChatWrapper from "@/components/chat-wrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { formatUrl } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Suspense } from "react";

interface PageProps {
  params: {
    url: string[];
  };
}

function LoadingChat() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
}

// Error component
function ErrorAlert({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex h-screen items-start justify-center p-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
}

async function ChatContent({
  sessionId,
  formattedUrl,
}: {
  sessionId: string;
  formattedUrl: string;
}) {
  const [isAlreadyIndexed, initialMessages] = await Promise.all([
    redis.sismember("indexed-urls", formattedUrl),
    ragChat.history.getMessages({
      amount: 10,
      sessionId,
    }),
  ]);

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: formattedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });
    await redis.sadd("indexed-urls", formattedUrl);
  }

  return (
    <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
  );
}

export default async function Page({ params }: PageProps) {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("sessionId")?.value;

  // if (!sessionCookie) {
  //   return <SessionError />;
  // }

  if (!params.url || params.url.length === 0) {
    return (
      <ErrorAlert
        title="Invalid URL"
        description="No URL provided. Please specify a valid URL."
      />
    );
  }

  const formattedUrl = formatUrl(params.url);
  const sessionId = `${formattedUrl}--${sessionCookie}`.replace(/\//g, "");

  return (
    <Suspense fallback={<LoadingChat />}>
      <ChatContent sessionId={sessionId} formattedUrl={formattedUrl} />
    </Suspense>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const formattedUrl = params.url ? formatUrl(params.url) : "Unknown URL";

  return {
    title: `Chat about ${formattedUrl}`,
    description: `Interactive chat about ${formattedUrl}`,
  };
}
