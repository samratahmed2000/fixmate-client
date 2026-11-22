export { cn } from "cn";

const serverApiUrl = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
  /\/+$/,
  "",
);

export const baseUrl =
  typeof window === "undefined"
    ? serverApiUrl
    : `${window.location.origin}/api/proxy`;
