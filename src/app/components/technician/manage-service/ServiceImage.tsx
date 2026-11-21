import { WrenchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/services";

const ServiceImage = ({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative size-12 shrink-0 overflow-hidden rounded-lg border bg-muted",
        className,
      )}
    >
      {service.serviceImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={service.serviceImage}
          alt={service.title}
          className="size-full object-cover"
        />
      ) : (
        <div className="flex size-full items-center justify-center text-muted-foreground">
          <WrenchIcon className="size-5" />
        </div>
      )}
    </div>
  );
};

export default ServiceImage;
