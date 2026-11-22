import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getAuthHref,
  getPostAuthDestination,
  getSafeRedirect,
} from "@/lib/navigation/redirect";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  const redirect = getSafeRedirect(
    request.nextUrl.searchParams.get("redirect") ?? undefined,
  );

  if (!session?.user) {
    return NextResponse.redirect(new URL(getAuthHref("/sign-in", redirect), request.url));
  }

  const destination = getPostAuthDestination(session.user.role, redirect);
  return NextResponse.redirect(new URL(destination, request.url));
}
