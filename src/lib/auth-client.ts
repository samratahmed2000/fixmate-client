import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { BetterAuthOptions } from "better-auth";

type AuthClientOptions = Omit<BetterAuthOptions, "user"> & {
  user: Omit<NonNullable<BetterAuthOptions["user"]>, "additionalFields"> & {
    additionalFields: {
      role: {
        type: ["customer", "technician", "admin"];
        required: false;
        defaultValue: "customer";
        input: true;
      };
      phone: { type: "string"; required: false; input: true };
      area: { type: "string"; required: false; input: true };
      bio: { type: "string"; required: false; input: true };
    };
  };
};

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<AuthClientOptions>()],
});

export const { signIn, signUp, useSession, updateUser } = authClient;

export const signOut: typeof authClient.signOut = async (...args) => {
  const result = await authClient.signOut(...args);
  const hasError = "error" in result && Boolean(result.error);
  if (!hasError) {
    const response = await fetch("/api/auth/token", {
      method: "DELETE",
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Could not clear the authentication token cookie");
    }
  }
  return result;
};
