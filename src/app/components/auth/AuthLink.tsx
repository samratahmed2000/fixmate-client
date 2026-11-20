import { AuthFormProps } from "@/types/auth";
import Link from "next/link";

const AuthLink = ({ type }: AuthFormProps) => {
  const isSignUp = type === "sign-up";
  return (
    <div className="text-center text-sm text-muted-foreground pt-1">
      {isSignUp ? (
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            Sign In
          </Link>
        </>
      ) : (
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
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
