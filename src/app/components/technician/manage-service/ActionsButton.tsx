"use client";

import { EyeIcon, PencilIcon, PowerIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionsButtonProps {
  isAvailable: boolean;
  isToggling?: boolean;
  mobile?: boolean;
}

const ActionsButton = ({
  isAvailable,
  isToggling = false,
  mobile = false,
}: ActionsButtonProps) => {
  return (
    <div
      className={cn(
        mobile
          ? "grid grid-cols-2 gap-2"
          : "flex items-center justify-center gap-2 pt-0.5",
      )}
    >
      <Button
        variant="outline"
        size={mobile ? "sm" : "icon-sm"}
        className={cn(mobile ? "h-10 w-full justify-start px-3" : "size-8")}
        aria-label="View service"
      >
        <EyeIcon className={cn(mobile ? "size-4" : "size-3.5")} />
        {mobile && <span>View</span>}
      </Button>

      <Button
        variant="outline"
        size={mobile ? "sm" : "icon-sm"}
        className={cn(mobile ? "h-10 w-full justify-start px-3" : "size-8")}
        aria-label="Edit service"
      >
        <PencilIcon className={cn(mobile ? "size-4" : "size-3.5")} />
        {mobile && <span>Edit</span>}
      </Button>

      <Button
        variant="outline"
        size={mobile ? "sm" : "icon-sm"}
        disabled={isToggling}
        className={cn(
          mobile ? "h-10 w-full justify-start px-3" : "size-8",
          isAvailable
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-muted-foreground",
        )}
        aria-label={isAvailable ? "Turn Off" : "Turn On"}
      >
        <PowerIcon className={cn(mobile ? "size-4" : "size-3.5")} />
        {mobile && <span>{isAvailable ? "Deactivate" : "Activate"}</span>}
      </Button>

      <Button
        variant="destructive"
        size={mobile ? "sm" : "icon-sm"}
        className={cn(mobile ? "h-10 w-full justify-start px-3" : "size-8")}
        aria-label="Delete service"
      >
        <Trash2Icon className={cn(mobile ? "size-4" : "size-3.5")} />
        {mobile && <span>Delete</span>}
      </Button>
    </div>
  );
};

export default ActionsButton;
