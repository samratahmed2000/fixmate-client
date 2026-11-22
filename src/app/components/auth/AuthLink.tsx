import { AuthFormProps } from "@/types/auth";
import { getAuthHref } from "@/lib/navigation/redirect";
import Link from "next/link";

const AuthLink = ({ type, redirect }: AuthFormProps) => {
  const isSignUp = type === "sign-up";
  return (
    <div className="text-center text-sm text-muted-foreground pt-1">
      {isSignUp ? (
        <>
          Already have an account?{" "}
          <Link
            href={getAuthHref("/sign-in", redirect)}
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            Sign In
          </Link>
        </>
      ) : (
        <>
          Don&apos;t have an account?{" "}
          <Link
            href={getAuthHref("/sign-up", redirect)}
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthLink;
