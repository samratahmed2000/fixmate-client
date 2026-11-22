import { signIn } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { getSafeRedirect } from "@/lib/navigation/redirect";

export const handleGoogleSignIn = async (redirect?: string) => {
  try {
    // On success better-auth redirects the browser to Google, so there is
    // nothing to await beyond the response.
    const safeRedirect = getSafeRedirect(redirect);
    const completeUrl =
      safeRedirect === "/"
        ? "/api/auth/complete"
        : `/api/auth/complete?redirect=${encodeURIComponent(safeRedirect)}`;

    const { error } = await signIn.social({
      provider: "google",
      callbackURL: completeUrl,
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
