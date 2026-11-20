import { auth, mongoClient } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth);

// The MongoDB driver closes its topology for good after a failed initial
// connect (e.g. the database was briefly unreachable while `next dev`
// started), which makes every later auth request fail with
// MongoTopologyClosedError until the server restarts. `connect()` is a no-op
// when the topology is healthy and rebuilds it when it is closed.
const ensureConnected = async () => {
  await mongoClient.connect().catch(() => {
    // Let better-auth report the database error with its own response.
  });
};

export const GET = async (request: Request) => {
  await ensureConnected();
  return handlers.GET(request);
};

export const POST = async (request: Request) => {
  await ensureConnected();
  return handlers.POST(request);
};
