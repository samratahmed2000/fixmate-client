import "server-only";
import { getServerAuthorizationHeader } from "@/lib/auth/server-session";

export const serverApiFetch = async (
  input: string | URL,
  init: RequestInit = {},
) => {
  const requestHeaders = new Headers(init.headers);
  requestHeaders.set("Authorization", await getServerAuthorizationHeader());

  return fetch(input, {
    ...init,
    headers: requestHeaders,
  });
};
