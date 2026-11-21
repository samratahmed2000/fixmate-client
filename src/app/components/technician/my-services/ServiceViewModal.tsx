"use client";

import {
  ClockIcon,
  DollarSignIcon,
  MapPinIcon,
  ShieldCheckIcon,
  TruckIcon,
  WrenchIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Service } from "@/types/services";

interface ServiceViewModalProps {
  service: Service | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ServiceViewModal = ({
  service,
  open,
  onOpenChange,
}: ServiceViewModalProps) => {
  if (!service) return null;

  const approvalStatus = service.approvalStatus || "Pending";
  const isAvailable =
    service.availability === "Active" ||
    (service.availability === undefined && service.isActive !== false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="font-normal">
              {service.category}
            </Badge>

            {/* Approval Status Badge */}
            {approvalStatus === "Approved" ? (
              <Badge
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium"
              >
                Approved
              </Badge>
            ) : approvalStatus === "Rejected" ? (
              <Badge
                variant="outline"
                className="border-destructive/30 bg-destructive/10 text-destructive font-medium"
              >
                Rejected
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium"
              >
                Pending Approval
              </Badge>
            )}

            {/* Availability Badge */}
            <Badge
              variant="outline"
              className={
                isAvailable
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium"
                  : "border-muted-foreground/30 bg-muted/60 text-muted-foreground font-medium"
              }
            >
              {isAvailable ? "Active" : "Not-Active"}
            </Badge>
          </div>

          <DialogTitle className="text-xl font-semibold mt-1">
            {service.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            View full details of {service.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Image */}
          {service.serviceImage ? (
            <div className="relative aspect-16/9 w-full overflow-hidden rounded-xl border bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.serviceImage}
                alt={service.title}
                className="size-full object-cover"
              />
            </div>
          ) : (
            <div className="flex aspect-16/9 w-full items-center justify-center rounded-xl border border-dashed bg-muted/40 text-muted-foreground">
              <WrenchIcon className="size-10 stroke-1" />
            </div>
          )}

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-2.5 rounded-lg border bg-muted/20 p-3">
              <DollarSignIcon className="size-4 shrink-0 text-primary" />
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  Base Price
                </p>
                <p className="text-sm font-semibold">৳{service.basePrice}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-lg border bg-muted/20 p-3">
              <ClockIcon className="size-4 shrink-0 text-primary" />
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  Duration
                </p>
                <p className="text-sm font-semibold truncate">
                  {service.estimatedDuration}
                </p>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 rounded-lg border bg-muted/20 p-3">
              <TruckIcon className="size-4 shrink-0 text-primary" />
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  Mode
                </p>
                <p className="text-sm font-semibold truncate">
                  {service.serviceMode}
                </p>
              </div>
            </div>
          </div>

          {/* Location & Technician */}
          <div className="grid gap-3 sm:grid-cols-2 text-sm">
            <div className="flex items-start gap-2 rounded-lg border p-3">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Service Area
                </p>
                <p className="font-medium text-foreground">
                  {service.serviceArea}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-lg border p-3">
              <ShieldCheckIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Technician
                </p>
                <p className="font-medium text-foreground">
                  {service.technicianName || "You"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {service.technicianEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5 rounded-lg border p-3.5 bg-muted/10">
            <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Description
            </h4>
            <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceViewModal;
