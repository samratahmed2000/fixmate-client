"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/types/category";
import type { Service } from "@/types/services";
import ApprovalStatusBadge from "./ApprovalStatusBadge";
import AvailabilityBadge from "./AvailabilityBadge";
import ServiceImage from "./ServiceImage";
import ActionsButton from "./ActionsButton";

const ServiceCard = ({
  service,
  categories,
}: {
  service: Service;
  categories: Category[];
}) => {
  const [isAvailable, setIsAvailable] = useState(
    service.isActive ?? service.availability !== "Not-Active",
  );

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 space-y-3.5">
        <div className="flex items-start gap-3">
          <ServiceImage service={service} className="size-16" />

          <div className="min-w-0 flex-1">
            <div className="flex flex-col items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground line-clamp-1">
                {service.title}
              </h3>
              <span className="font-bold text-foreground shrink-0 tabular-nums">
                ৳{service.basePrice}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <Badge variant="secondary" className="font-normal text-xs">
            {service.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {service.serviceArea} · {service.estimatedDuration}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-b py-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground font-medium">Approval:</span>
            <ApprovalStatusBadge status={service.approvalStatus} />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground font-medium">Status:</span>
            <AvailabilityBadge
              availability={isAvailable ? "Active" : "Not-Active"}
              isActive={isAvailable}
            />
          </div>
        </div>

        <div className="pt-1">
          <ActionsButton
            service={service}
            categories={categories}
            isAvailable={isAvailable}
            onAvailabilityChange={setIsAvailable}
            mobile
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
