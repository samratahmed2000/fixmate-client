import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import ImageCarousel from "@/app/components/shared/ImageCarousel";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { heroImages } from "@/lib/images/hero-images";

const Hero = () => {
  return (
    <section className="relative h-[90vh] min-h-104 bg-neutral-950">
      <ImageCarousel
        images={heroImages}
        ariaLabel="FixMate repair services showcase"
        preloadFirst
        fill
        autoplay
        autoplayDelay={4000}
        dotsPosition="overlay"
        overlay={
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-black/85 via-black/55 to-black/35"
            />

            <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center text-white sm:px-6">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/50 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
                <ShieldCheck aria-hidden="true" className="size-3.5" />
                Verified Technicians & Doorstep Service
              </span>

              <h1 className="mt-4 font-heading text-xl font-semibold tracking-tight text-balance sm:mt-5 sm:text-4xl lg:text-5xl">
                Expert Repairs For Your <br /> Devices & Home Appliances
              </h1>

              <p className="mt-2 max-w-xl text-[12px] text-pretty text-white/80 sm:text-base">
                Book trusted technicians for fast and reliable repairs at your
                doorstep.
              </p>

              <div className="mt-6 flex w-full flex-col items-center gap-3 sm:mt-8 sm:w-auto sm:flex-row">
                <Link
                  href="/services"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "pointer-events-auto w-full bg-background text-foreground hover:bg-background/90 sm:w-auto",
                  )}
                >
                  Repair Services
                  <ArrowRight aria-hidden="true" />
                </Link>
                <Link
                  href="/become-technician"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "pointer-events-auto w-full border-white/60 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:w-auto",
                  )}
                >
                  Become a Technician
                </Link>
              </div>
            </div>
          </>
        }
      />
    </section>
  );
};

export default Hero;
