import { signIn } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

export const handleGoogleSignIn = async () => {
  try {
    toast.add({
      title: "Connecting to Google...",
      description: "Redirecting to Google authentication.",
      type: "loading",
    });

    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  } catch (error) {
    console.error("Google sign in failed:", error);
    toast.add({
      title: "Google Sign In Failed",
      description: "Could not authenticate with Google. Please try again.",
      type: "error",
    });
  }
};
