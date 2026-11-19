"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Logo from "@/app/components/shared/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getNavLinks, isActivePath, navLinkClass } from "@/lib/nav-links";

const Navbar = () => {
  const pathname = usePathname();
  const navLinks = getNavLinks();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="FixMate home"
          className="shrink-0 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Logo />
        </Link>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
        >
          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(navLinkClass(active), "px-3 py-2")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
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

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className="md:hidden"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-full max-w-xs gap-0 p-0">
              <SheetTitle className="sr-only">Main navigation</SheetTitle>

              <SheetHeader className="border-b px-4 py-3">
                <Link
                  href="/"
                  aria-label="FixMate home"
                  onClick={() => setOpen(false)}
                  className="w-fit rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Logo />
                </Link>
              </SheetHeader>

              <nav aria-label="Mobile" className="flex flex-col gap-1 p-3">
                {navLinks.map((link) => {
                  const active = isActivePath(pathname, link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(navLinkClass(active), "px-3 py-2.5")}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <SheetFooter className="border-t p-3">
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setOpen(false)}
                  className={buttonVariants({ size: "lg" })}
                >
                  Sign Up
                </Link>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
