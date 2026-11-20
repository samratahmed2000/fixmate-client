import { signIn } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

export const handleGoogleSignIn = async () => {
  try {
    // On success better-auth redirects the browser to Google, so there is
    // nothing to await beyond the response.
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.add({
        title: "Google Sign In Failed",
        description:
          error.message ?? "Could not start Google authentication.",
        type: "error",
      });
    }
  } catch (error) {
    console.error("Google sign in failed:", error);
    toast.add({
      title: "Google Sign In Failed",
      description:
        "Could not authenticate with Google. Check the OAuth client ID, secret and redirect URI.",
      type: "error",
    });
  }
};
