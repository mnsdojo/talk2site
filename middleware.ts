import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // check for existing sessionId cookie
  const sessionId = req.cookies.get("sessionId");

  if (!sessionId) {
    const newSessionId = crypto.randomUUID();
    res.cookies.set("sessionId", newSessionId);
  }
  return res;
}

export const config = {
  matcher: [
    // Match all API routes
    "/",
    "//:path",
  ],
};
