import Link from "next/link";
import { SearchXIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[55vh] w-full max-w-2xl items-center justify-center px-4 py-16">
      <Card className="w-full border-dashed">
        <CardContent className="flex flex-col items-center gap-5 py-12 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <SearchXIcon aria-hidden="true" className="size-7" />
          </span>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-primary">Error 404</p>
            <h1 className="font-heading text-2xl font-bold tracking-tight">
              Page not found
            </h1>
            <p className="text-sm text-muted-foreground">
              The page you are looking for may have moved or no longer exists.
            </p>
          </div>
          <Link href="/" className={cn(buttonVariants())}>
            Back to home
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
