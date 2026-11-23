import "server-only";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { JWT_COOKIE_NAME } from "./jwt-constants";

type AuthRole = "customer" | "technician" | "admin";
type SessionUser = {
  id: string;
  role: AuthRole;
  name: string;
  email: string;
  image?: string | null;
  phone?: string | null;
  area?: string | null;
  bio?: string | null;
};
type AuthSession = {
  user: SessionUser;
  session: Record<string, unknown>;
};

const isRole = (role: unknown): role is AuthRole =>
  role === "customer" || role === "technician" || role === "admin";

const apiOrigin = () =>
  process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/+$/, "") || null;

const tokenFromSetCookie = (setCookie: string | null) =>
  setCookie?.match(/(?:^|,\s*)fixmate\.jwt=([^;,\s]+)/)?.[1] ?? null;

export const getServerAuthContext = cache(async () => {
  const requestHeaders = await headers();
  const cookieStore = await cookies();
  const hasAuthSessionCookie =
    cookieStore.has("better-auth.session_token") ||
    cookieStore.has("__Secure-better-auth.session_token");
  if (!hasAuthSessionCookie) return null;

  const origin = apiOrigin();
  if (!origin) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${origin}/api/auth/session`, {
    headers: {
      cookie: requestHeaders.get("cookie") ?? "",
    },
    cache: "no-store",
  });
  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new Error("The auth server returned an invalid session response");
  }

  if (response.status === 410) return null;
  if (!response.ok) {
    throw new Error("Unable to verify the authentication session");
  }

  const session =
    typeof result === "object" &&
    result !== null &&
    "data" in result &&
    typeof result.data === "object" &&
    result.data !== null &&
    "session" in result.data
      ? result.data.session
      : null;
  if (
    typeof session !== "object" ||
    session === null ||
    !("user" in session) ||
    typeof session.user !== "object" ||
    session.user === null ||
    !("id" in session.user) ||
    typeof session.user.id !== "string" ||
    !("role" in session.user) ||
    !isRole(session.user.role)
  ) {
    return null;
  }

  const refreshedToken = tokenFromSetCookie(response.headers.get("set-cookie"));
  const token = refreshedToken ?? cookieStore.get(JWT_COOKIE_NAME)?.value;
  if (!token) return null;

  return {
    session: session as AuthSession,
    token,
  };
});

export const getServerAuthorizationHeader = async () => {
  const context = await getServerAuthContext();
  if (!context) {
    throw new Error("A verified sign-in is required for this request");
  }
  return `Bearer ${context.token}`;
};
