import { auth, mongoClient } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth);

export const GET = async (request: Request) => {
  await mongoClient.connect();
  return handlers.GET(request);
};

export const POST = async (request: Request) => {
  await mongoClient.connect();
  return handlers.POST(request);
};
