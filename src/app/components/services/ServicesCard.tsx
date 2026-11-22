"use client";

import { MapPinIcon, UserRoundIcon, WrenchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Service } from "@/types/services";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const ServicesCard = ({ service }: { service: Service }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const role = session?.user?.role;
  const canViewDetails = !isPending && (!role || role === "customer");

  const handleViewServiceDetails = async () => {
    router.push(`/services/${service._id}`);
  };

  return (
    <>
      <Card className="group flex h-full flex-col overflow-hidden p-0 transition-shadow hover:shadow-md">
        <div className="relative aspect-video overflow-hidden bg-muted">
          {service.serviceImage ? (
            <Image
              src={service.serviceImage}
              alt={service.title}
              width={800}
              height={450}
              unoptimized
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <WrenchIcon className="size-10" />
            </div>
          )}
        </div>

        <CardHeader className="gap-3">
          <div className="flex flex-wrap justify-between px-2 gap-2">
            <Badge variant="secondary">{service.category}</Badge>
            <Badge variant="outline">{service.serviceMode}</Badge>
          </div>
          <CardTitle className="line-clamp-1 text-lg">
            {service.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-4">
          <div className="flex items-start gap-0.5 text-sm text-muted-foreground">
            <MapPinIcon className="mt-0.5 size-4 shrink-0" />
            <span className="line-clamp-2">{service.serviceArea}</span>
          </div>

          <div className="flex items-center justify-between gap-3 border-t pt-3">
            <div>
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="font-heading text-lg font-semibold text-foreground">
                ৳{service.basePrice}
              </p>
            </div>
            <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
              <UserRoundIcon className="size-4 shrink-0" />
              <span className="truncate">{service.technicianName}</span>
            </div>
          </div>

          {canViewDetails ? (
            <Button
              onClick={handleViewServiceDetails}
              className="mt-auto mb-4 w-full cursor-pointer"
            >
              View Details
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
};

export default ServicesCard;
