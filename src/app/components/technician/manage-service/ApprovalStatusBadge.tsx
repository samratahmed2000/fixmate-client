import { CheckCircle2Icon, ClockIcon, XCircleIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ApprovalStatusBadgeProps {
  status?: string;
}

const ApprovalStatusBadge = ({
  status = "Pending",
}: ApprovalStatusBadgeProps) => {
  switch (status) {
    case "Approved":
      return (
        <Badge
          variant="outline"
          className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 gap-1 font-medium"
        >
          <CheckCircle2Icon className="size-3" />
          Approved
        </Badge>
      );
    case "Rejected":
      return (
        <Badge
          variant="outline"
          className="border-destructive/30 bg-destructive/10 text-destructive gap-1 font-medium"
        >
          <XCircleIcon className="size-3" />
          Rejected
        </Badge>
      );
    case "Pending":
    default:
      return (
        <Badge
          variant="outline"
          className="border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400 gap-1 font-medium"
        >
          <ClockIcon className="size-3" />
          Pending
        </Badge>
      );
  }
};

export default ApprovalStatusBadge;
