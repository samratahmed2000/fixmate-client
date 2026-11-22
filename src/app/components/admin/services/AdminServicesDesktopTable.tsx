import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ApprovalStatusBadge from "@/app/components/technician/manage-service/ApprovalStatusBadge";
import type { Service } from "@/types/services";
import AdminServiceActions from "./AdminServiceActions";
import AdminServiceImage from "./AdminServiceImage";

const AdminServicesDesktopTable = ({
  services,
  onUpdated,
}: {
  services: Service[];
  onUpdated: () => void;
}) => (
  <div className="hidden overflow-hidden rounded-xl border bg-card shadow-xs md:block">
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/30">
          <TableHead className="w-[34%]">Service</TableHead>
          <TableHead>Technician</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service._id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <AdminServiceImage service={service} />
                <div className="min-w-0">
                  <p className="truncate font-semibold">{service.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {service.serviceArea}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <p className="font-medium">{service.technicianName}</p>
                <p className="text-xs text-muted-foreground">
                  {service.technicianEmail}
                </p>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="secondary">{service.category}</Badge>
            </TableCell>
            <TableCell className="text-right font-semibold">
              ৳{service.basePrice}
            </TableCell>
            <TableCell>
              <ApprovalStatusBadge status={service.approvalStatus} />
            </TableCell>
            <TableCell>
              <div className="flex justify-end">
                <AdminServiceActions service={service} onUpdated={onUpdated} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default AdminServicesDesktopTable;
