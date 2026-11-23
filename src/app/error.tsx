"use client";

import { useEffect } from "react";
import { AlertTriangleIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[55vh] w-full max-w-2xl items-center justify-center px-4 py-16">
      <Card className="w-full border-destructive/30">
        <CardContent className="flex flex-col items-center gap-5 py-12 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangleIcon aria-hidden="true" className="size-7" />
          </span>
          <div className="space-y-2">
            <h1 className="font-heading text-2xl font-bold tracking-tight">
              Something went wrong
            </h1>
            <p className="text-sm text-muted-foreground">
              We could not load this page. Please try again.
            </p>
            {error.digest ? (
              <p className="text-xs text-muted-foreground">
                Error reference: {error.digest}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={reset}
            className={cn(buttonVariants())}
          >
            Try again
          </button>
        </CardContent>
      </Card>
    </section>
  );
}
