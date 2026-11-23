import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWT_COOKIE_NAME, JWT_MAX_AGE_SECONDS } from "@/lib/auth/jwt-constants";

const isAuthApiRequest = (pathname: string) =>
  pathname === "/api/auth" || pathname.startsWith("/api/auth/");

const apiOrigin = () =>
  process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/+$/, "") ||
  "http://localhost:8000";

const continueWithHeaders = (headers: Headers) =>
  NextResponse.next({ request: { headers } });

const getAuthSessionCookie = (request: NextRequest) =>
  request.cookies.get("better-auth.session_token")?.value ??
  request.cookies.get("__Secure-better-auth.session_token")?.value;

const getJwtFromSetCookie = (value: string | null) =>
  value?.match(/(?:^|,\s*)fixmate\.jwt=([^;,\s]+)/)?.[1] ?? null;

export async function proxy(request: NextRequest) {
  if (isAuthApiRequest(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("authorization");

  const sessionCookie = getAuthSessionCookie(request);
  const jwtCookie = request.cookies.get(JWT_COOKIE_NAME)?.value;
  if (!sessionCookie && !jwtCookie) {
    return continueWithHeaders(requestHeaders);
  }

  try {
    let token = jwtCookie;
    if (sessionCookie) {
      const tokenResponse = await fetch(`${apiOrigin()}/api/auth/token`, {
        method: "POST",
        headers: {
          cookie: request.headers.get("cookie") ?? "",
        },
        cache: "no-store",
      });

      if (tokenResponse.status === 410) {
        const response = continueWithHeaders(requestHeaders);
        response.cookies.delete(JWT_COOKIE_NAME);
        return response;
      }
      if (!tokenResponse.ok) {
        throw new Error(`Auth backend returned ${tokenResponse.status}`);
      }

      token =
        getJwtFromSetCookie(tokenResponse.headers.get("set-cookie")) ??
        undefined;
      if (!token) {
        throw new Error("Auth backend did not issue the JWT cookie");
      }
    }

    if (!token) return continueWithHeaders(requestHeaders);

    requestHeaders.set("Authorization", `Bearer ${token}`);
    const response = continueWithHeaders(requestHeaders);
    if (token !== jwtCookie) {
      response.cookies.set({
        name: JWT_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: JWT_MAX_AGE_SECONDS,
      });
    }
    return response;
  } catch (error) {
    console.error("Failed to forward authentication token:", error);
    return NextResponse.json(
      { success: false, message: "Unable to forward authentication token" },
      { status: 503 },
    );
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
