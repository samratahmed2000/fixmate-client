"use client";

import * as React from "react";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { notifyDashboardDataUpdated } from "@/lib/dashboard/refresh";
import type { Service } from "@/types/services";

const AdminServiceActions = ({
  service,
  onUpdated,
}: {
  service: Service;
  onUpdated: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const updateApproval = async (approvalStatus: "Approved" | "Rejected") => {
    if (!service._id) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: service._id,
          approvalStatus,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      toast.add({
        title: `Service ${approvalStatus}`,
        description: result.message,
        type: "success",
      });
      notifyDashboardDataUpdated();
      onUpdated();
    } catch (error) {
      toast.add({
        title: "Approval Update Failed",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {service.approvalStatus === "Pending" ? (
        <Button
          type="button"
          size="sm"
          disabled={isSubmitting}
          onClick={() => void updateApproval("Approved")}
        >
          <CheckIcon />
          Approve
        </Button>
      ) : null}
      {service.approvalStatus === "Pending" ? (
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="text-destructive hover:text-destructive"
          disabled={isSubmitting}
          onClick={() => void updateApproval("Rejected")}
        >
          <XIcon />
          Reject
        </Button>
      ) : null}
    </div>
  );
};

export default AdminServiceActions;
