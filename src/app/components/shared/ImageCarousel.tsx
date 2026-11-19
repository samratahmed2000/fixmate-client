"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ImageCarouselProps } from "@/types/slider";

const ImageCarousel = ({
  images,
  className,
  ariaLabel = "Image carousel",
  showDots = true,
  loop = true,
  preloadFirst = false,
  overlay,
  overlayContentClassName,
  dotsPosition = "below",
  fill = false,
  autoplay = false,
  autoplayDelay = 4000,
}: ImageCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api || !autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = window.setInterval(() => api.scrollNext(), autoplayDelay);

    const onVisibilityChange = () => {
      window.clearInterval(timer);

      if (!document.hidden) {
        timer = window.setInterval(() => api.scrollNext(), autoplayDelay);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [api, autoplay, autoplayDelay]);

  const dots =
    showDots && images.length > 1 ? (
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-2",
          dotsPosition === "overlay"
            ? "absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
            : "mt-4",
        )}
      >
        {images.map((image, index) => {
          const active = index === current;

          return (
            <span
              key={image.src}
              className={cn(
                "h-2 rounded-full outline-none transition-all",
                dotsPosition === "overlay"
                  ? active
                    ? "w-7 bg-white "
                    : "w-2 bg-white/50"
                  : active
                    ? "w-8 bg-primary "
                    : "w-2 bg-border",
              )}
            />
          );
        })}
      </div>
    ) : null;

  return (
    <div
      className={cn(
        "relative w-full",
        fill &&
          "h-full **:data-[slot=carousel]:h-full **:data-[slot=carousel-content]:h-full [&_[data-slot=carousel-content]>div]:h-full",
        className,
      )}
    >
      <Carousel
        setApi={setApi}
        aria-label={ariaLabel}
        opts={{ align: "start", loop }}
        className={cn("w-full", fill && "h-full")}
      >
        <CarouselContent className={cn("ml-0", fill && "h-full")}>
          {images.map((image, index) => (
            <CarouselItem
              key={image.src}
              className={cn("pl-0", fill && "relative h-full")}
            >
              {fill ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="100vw"
                  preload={preloadFirst && index === 0}
                  className="object-cover"
                />
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width ?? 1344}
                  height={image.height ?? 768}
                  sizes="100vw"
                  preload={preloadFirst && index === 0}
                  className="h-auto w-full"
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        {overlay ? (
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-10 flex items-center justify-center",
              overlayContentClassName,
            )}
          >
            {overlay}
          </div>
        ) : null}

        {dotsPosition === "overlay" ? dots : null}
      </Carousel>

      {dotsPosition === "below" ? dots : null}
    </div>
  );
};

export default ImageCarousel;
