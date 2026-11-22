"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdminUser } from "@/types/admin";

type Props = {
  user: AdminUser;
  isApproving: boolean;
  onApprove: (userId: string) => void;
};

const AdminUserApplication = ({ user, isApproving, onApprove }: Props) => {
  const application = user.technicianApplication;
  if (
    !application ||
    application.status !== "pending" ||
    user.role !== "customer"
  ) {
    return null;
  }

  return (
    <Button
      type="button"
      size="sm"
      disabled={isApproving}
      onClick={() => onApprove(user.id)}
    >
      <CheckCircle2 aria-hidden="true" />
      {isApproving ? "Approving…" : "Approve"}
    </Button>
  );
};

export default AdminUserApplication;
