import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Service } from "@/types/services";
import ApprovalStatusBadge from "./ApprovalStatusBadge";
import AvailabilityBadge from "./AvailabilityBadge";
import ServiceImage from "./ServiceImage";
import ActionsButton from "./ActionsButton";

const ServiceTableRow = ({ service }: { service: Service }) => {
  const isAvailable =
    service.availability === "Active" ||
    (service.availability === undefined && service.isActive !== false);

  return (
    <TableRow className="transition-colors hover:bg-muted/40">
      {/* Service Info */}
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          <ServiceImage service={service} />
          <div className="min-w-0 max-w-57.5 text-left">
            <p
              className="truncate font-semibold text-foreground"
              title={service.title}
            >
              {service.title}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {service.serviceArea} · {service.estimatedDuration}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Category */}
      <TableCell className="text-center">
        <Badge variant="secondary" className="font-normal">
          {service.category}
        </Badge>
      </TableCell>

      {/* Price */}
      <TableCell className="text-center font-semibold tabular-nums text-foreground">
        ৳{service.basePrice}
      </TableCell>

      {/* Approval Status */}
      <TableCell className="text-center">
        <ApprovalStatusBadge status={service.approvalStatus} />
      </TableCell>

      {/* Availability */}
      <TableCell className="text-center">
        <AvailabilityBadge
          availability={service.availability}
          isActive={service.isActive}
        />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-center">
        <ActionsButton isAvailable={isAvailable} />
      </TableCell>
    </TableRow>
  );
};

export default ServiceTableRow;
