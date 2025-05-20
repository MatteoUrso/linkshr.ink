import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // https://www.better-auth.com/docs/integrations/next#middleware
  const sessionCookie = getSessionCookie(request);

  // only check for the existence of a session cookie
  if (!sessionCookie) {
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard(.*)"],
};
