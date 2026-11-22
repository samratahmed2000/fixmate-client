import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ApprovalStatusBadge from "@/app/components/technician/manage-service/ApprovalStatusBadge";
import type { Service } from "@/types/services";
import AdminServiceActions from "./AdminServiceActions";
import AdminServiceImage from "./AdminServiceImage";

const AdminServicesMobileCards = ({
  services,
  onUpdated,
}: {
  services: Service[];
  onUpdated: () => void;
}) => (
  <div className="grid gap-3 md:hidden">
    {services.map((service) => (
      <Card key={service._id} size="sm" className="border-border shadow-xs">
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <AdminServiceImage service={service} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{service.title}</p>
              <p className="truncate text-sm text-muted-foreground">
                {service.category}
              </p>
            </div>
            <ApprovalStatusBadge status={service.approvalStatus} />
          </div>
          <div className="grid grid-cols-2 gap-3 border-t pt-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Technician</p>
              <p className="truncate font-medium">{service.technicianName}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="font-semibold">৳{service.basePrice}</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 border-t pt-3">
            <Badge variant="outline">{service.serviceMode}</Badge>
            <AdminServiceActions service={service} onUpdated={onUpdated} />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default AdminServicesMobileCards;
