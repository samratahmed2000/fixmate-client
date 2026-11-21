import { CustomerBooking } from "@/types/bookings";
import { WrenchIcon } from "lucide-react";
import Image from "next/image";

export const ServiceThumbnail = ({ booking }: { booking: CustomerBooking }) => {
  const title = booking.service?.title || "Service unavailable";
  const image = booking.service?.serviceImage;

  return (
    <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted text-muted-foreground">
      {image ? (
        <Image
          src={image}
          alt={title}
          width={56}
          height={56}
          unoptimized
          className="size-full object-cover"
        />
      ) : (
        <WrenchIcon className="size-5" />
      )}
    </div>
  );
};
