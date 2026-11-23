"use client";

import { useEffect } from "react";
import { AlertTriangleIcon } from "lucide-react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root layout error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-4 py-16">
          <section className="flex w-full flex-col items-center gap-5 rounded-xl border border-destructive/30 bg-card px-6 py-12 text-center shadow-sm">
            <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangleIcon aria-hidden="true" className="size-7" />
            </span>
            <div className="space-y-2">
              <h1 className="font-heading text-2xl font-bold tracking-tight">
                Something went wrong
              </h1>
              <p className="text-sm text-muted-foreground">
                We could not load FixMate. Please try again.
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
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
