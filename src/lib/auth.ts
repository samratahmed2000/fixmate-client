import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { getAuthBaseURL, getTrustedOrigins } from "./auth-origins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("fixMate");

export { client as mongoClient };

export const auth = betterAuth({
  baseURL: getAuthBaseURL(),
  trustedOrigins: getTrustedOrigins(),

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
