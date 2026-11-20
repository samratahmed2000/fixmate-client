"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/lib/auth-client";
import UserMenu from "./UserMenu";
import { AuthActionsProps } from "@/types/navigation";

const AuthActions = ({ variant = "desktop", onNavigate }: AuthActionsProps) => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <Skeleton className="size-10 rounded-full" />;
  }

  if (session?.user) {
    return (
      <UserMenu
        user={session.user}
        compact={variant === "desktop"}
        onNavigate={onNavigate}
      />
    );
  }

  if (variant === "sheet") {
    return (
      <>
        <Link
          href="/sign-in"
          onClick={onNavigate}
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          onClick={onNavigate}
          className={buttonVariants({ size: "lg" })}
        >
          Sign Up
        </Link>
      </>
    );
  }

  return (
    <div className="hidden items-center gap-2 md:flex">
      <Link
        href="/sign-in"
        className={buttonVariants({ variant: "ghost", size: "lg" })}
      >
        Sign In
      </Link>
      <Link href="/sign-up" className={buttonVariants({ size: "lg" })}>
        Sign Up
      </Link>
    </div>
  );
};

export default AuthActions;
