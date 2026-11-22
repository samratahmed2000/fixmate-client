import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/app/components/shared/Logo";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getNavLinks } from "@/lib/navigation/nav-links";
import { socialLinks } from "@/lib/navigation/social-links";
import { Category } from "@/types/category";
import getCategories from "@/lib/api/getCategories";

const Footer = async () => {
  const quickLinks = getNavLinks();

  const categoriesData = await getCategories();
  const categories: Category[] = Array.isArray(categoriesData)
    ? categoriesData
    : (categoriesData?.data ?? []);

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="FixMate home"
              className="inline-flex rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Smart device and home appliance repair, handled by trusted
              technicians.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className={buttonVariants({
                      variant: "outline",
                      size: "icon-lg",
                    })}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:col-span-5">
            <nav aria-label="Quick links">
              <h2 className="font-heading text-sm font-semibold">
                Quick Links
              </h2>
              <ul className="mt-4 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Popular categories">
              <h2 className="font-heading text-sm font-semibold">
                Popular Category
              </h2>
              <ul className="mt-4 space-y-3">
                {categories.map((category) => (
                  <li key={category._id}>
                    <Link
                      href={`/services?category=${encodeURIComponent(category.slug)}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-heading text-sm font-semibold">Contact Info</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <Mail
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                />
                <a
                  href="mailto:support@fixmate.com"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  support@fixmate.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                />
                <div className="space-y-1">
                  <Link
                    href="tel:+8801333094818"
                    className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    +8801333094818
                  </Link>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                />
                <address className="text-sm not-italic text-muted-foreground">
                  Dhaka, Bangladesh
                </address>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mt-12" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground lg:flex-row">
          <p>© FixMate. All rights reserved.</p>
          <p>Smart device &amp; home appliance repair.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
