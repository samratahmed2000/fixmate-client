"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  handleServiceDelete,
  handleServiceToggle,
} from "@/helper/services/handleServiceActions";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/category";
import type { Service } from "@/types/services";
import ServiceDeleteModal from "../my-services/ServiceDeleteModal";
import ServiceEditModal from "../my-services/ServiceEditModal";

interface ActionsButtonProps {
  service: Service;
  categories: Category[];
  isAvailable: boolean;
  onAvailabilityChange: (isAvailable: boolean) => void;
  mobile?: boolean;
}

const ActionsButton = ({
  service,
  categories,
  isAvailable,
  onAvailabilityChange,
  mobile = false,
}: ActionsButtonProps) => {
  const router = useRouter();
  const [isToggling, setIsToggling] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          mobile
            ? "flex items-center justify-center gap-6"
            : "flex items-center justify-center gap-2 pt-0.5",
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={cn("size-8 cursor-pointer", mobile && "shrink-0")}
          aria-label="Edit service"
          title="Edit service"
          disabled={!service._id}
          onClick={() => setIsEditOpen(true)}
        >
          <PencilIcon className="size-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Switch
            checked={isAvailable}
            onCheckedChange={() =>
              void handleServiceToggle(
                service._id,
                isToggling,
                setIsToggling,
                onAvailabilityChange,
              )
            }
            disabled={isToggling || !service._id}
            aria-label={isAvailable ? "Turn service off" : "Turn service on"}
          />
          <span className="sr-only">{isAvailable ? "On" : "Off"}</span>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={cn(
            "size-8 text-destructive hover:bg-destructive/10 hover:text-destructive",
            "cursor-pointer",
            mobile && "shrink-0",
          )}
          aria-label="Delete service"
          title="Delete service"
          disabled={!service._id}
          onClick={() => setIsDeleteOpen(true)}
        >
          <Trash2Icon className="size-4" />
        </Button>
      </div>

      <ServiceEditModal
        service={service}
        categories={categories}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
      <ServiceDeleteModal
        service={service}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={(serviceToDelete) =>
          handleServiceDelete(serviceToDelete, () => router.refresh())
        }
      />
    </>
  );
};

export default ActionsButton;
