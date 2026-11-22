import Image from "next/image";
import { WrenchIcon } from "lucide-react";
import type { Service } from "@/types/services";

const AdminServiceImage = ({ service }: { service: Service }) => (
  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border bg-muted">
    {service.serviceImage ? (
      <Image
        src={service.serviceImage}
        alt={service.title}
        fill
        sizes="48px"
        unoptimized
        className="object-cover"
      />
    ) : (
      <div className="flex size-full items-center justify-center text-muted-foreground">
        <WrenchIcon className="size-5" />
      </div>
    )}
  </div>
);

export default AdminServiceImage;
