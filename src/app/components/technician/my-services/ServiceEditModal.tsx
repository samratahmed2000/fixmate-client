"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Category } from "@/types/category";
import type { Service } from "@/types/services";
import ServiceForm from "../add-service/ServiceForm";

interface ServiceEditModalProps {
  service: Service | null;
  categories: Category[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const ServiceEditModal = ({
  service,
  categories,
  open,
  onOpenChange,
  onSuccess,
}: ServiceEditModalProps) => {
  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Update Service
          </DialogTitle>
          <DialogDescription>
            Update pricing, description, or photos for{" "}
            <span className="font-medium text-foreground">
              {service.title}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="pt-2">
          <ServiceForm
            categories={categories}
            mode="update"
            initialData={service}
            serviceId={service._id}
            technicianName={service.technicianName}
            technicianEmail={service.technicianEmail}
            submitButtonText="Save Changes"
            onSuccess={() => {
              onSuccess?.();
              onOpenChange(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceEditModal;
