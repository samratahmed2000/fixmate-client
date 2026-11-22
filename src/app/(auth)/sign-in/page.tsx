import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Logo from "@/app/components/shared/Logo";
import AuthForm from "@/app/components/auth/AuthForm";
import { getSafeRedirect } from "@/lib/navigation/redirect";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignInPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>;
}) => {
  const { redirect } = await searchParams;
  const redirectTo = getSafeRedirect(redirect);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-muted/20 px-4 py-12 sm:px-6 lg:px-8">
      {/* Top Left: Back to Home Button */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "gap-1.5 text-muted-foreground hover:text-foreground",
          )}
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-lg space-y-6">
        {/* Brand Logo */}
        <div className="flex flex-col items-center text-center mt-4">
          <Link
            href="/"
            aria-label="FixMate home"
            className="rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Logo />
          </Link>
        </div>

        {/* Auth Card Container */}
        <Card className="border-border shadow-xs">
          <CardHeader className="text-center pb-2">
            <CardTitle className="font-heading text-2xl font-bold tracking-tight">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Your trusted repair experience starts right where you left off.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-2">
            <AuthForm
              type="sign-in"
              redirect={redirectTo === "/" ? undefined : redirectTo}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default SignInPage;
