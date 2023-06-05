import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  if (request.nextUrl.pathname.startsWith("/articles/"))
    requestHeaders.set("x-next-article-slug", request.nextUrl.pathname.replace("/articles/", ""));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/articles/:path*",
};
