import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string, {
  // Fail fast instead of hanging 30s when the database is unreachable.
  serverSelectionTimeoutMS: 5000,
});
const db = client.db("fixMate");

export { client as mongoClient };

/**
 * The MongoDB driver closes its topology for good after a failed initial
 * connect (e.g. the database was briefly unreachable while `next dev`
 * started), which makes every later query fail with MongoTopologyClosedError
 * until the server restarts. `connect()` is a no-op when the topology is
 * healthy and rebuilds it when it is closed.
 *
 * Every better-auth entry point (route handlers and server components) has to
 * await this first.
 */
export const ensureMongoConnection = async () => {
  await client.connect().catch(() => {
    // Let better-auth report the database error with its own response.
  });
};

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  user: {
    additionalFields: {
      role: {
        type: ["customer", "technician", "admin"],
        required: false,
        defaultValue: "customer",
        input: true,
        transform: {
          input: (value) => {
            if (value === "technician") return "technician";
            return "customer";
          },
        },
      },

      phone: {
        type: "string",
        required: false,
        input: true,
      },

      area: {
        type: "string",
        required: false,
        input: true,
      },

      bio: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
