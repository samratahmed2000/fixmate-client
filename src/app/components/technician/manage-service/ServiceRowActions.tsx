"use client";

import { EyeIcon, PencilIcon, PowerIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/services";

interface ServiceRowActionsProps {
  service: Service;
  onView: (service: Service) => void;
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
  onToggleStatus: (service: Service) => void;
  isAvailable: boolean;
  isToggling?: boolean;
}

const ServiceRowActions = ({
  service,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
  isAvailable,
  isToggling = false,
}: ServiceRowActionsProps) => {
  return (
    <div className="flex items-center justify-end gap-1">
      {/* View */}
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onView(service)}
              aria-label="View service details"
            />
          }
        >
          <EyeIcon className="size-4 text-muted-foreground hover:text-foreground" />
        </TooltipTrigger>
        <TooltipContent>View Details</TooltipContent>
      </Tooltip>

      {/* Update */}
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onEdit(service)}
              aria-label="Update service"
            />
          }
        >
          <PencilIcon className="size-4 text-muted-foreground hover:text-foreground" />
        </TooltipTrigger>
        <TooltipContent>Update Service</TooltipContent>
      </Tooltip>

      {/* Toggle On/Off */}
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={isToggling}
              onClick={() => onToggleStatus(service)}
              aria-label={
                isAvailable ? "Turn off availability" : "Turn on availability"
              }
            />
          }
        >
          <PowerIcon
            className={cn(
              "size-4 transition-colors",
              isAvailable
                ? "text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                : "text-muted-foreground/60 hover:text-foreground",
            )}
          />
        </TooltipTrigger>
        <TooltipContent>
          {isAvailable ? "Turn Off (Inactive)" : "Turn On (Active)"}
        </TooltipContent>
      </Tooltip>

      {/* Delete */}
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-destructive/80 hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(service)}
              aria-label="Delete service"
            />
          }
        >
          <Trash2Icon className="size-4" />
        </TooltipTrigger>
        <TooltipContent>Delete Service</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ServiceRowActions;
