export type CarouselImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export interface ImageCarouselProps {
  images: CarouselImage[];
  className?: string;
  ariaLabel?: string;
  showDots?: boolean;
  loop?: boolean;
  preloadFirst?: boolean;
  overlay?: React.ReactNode;
  overlayContentClassName?: string;
  dotsPosition?: "below" | "overlay";
  fill?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
}
