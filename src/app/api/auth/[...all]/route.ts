import { auth, ensureMongoConnection } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth);

export const GET = async (request: Request) => {
  await ensureMongoConnection();
  return handlers.GET(request);
};

export const POST = async (request: Request) => {
  await ensureMongoConnection();
  return handlers.POST(request);
};
