import { Clock3Icon, MapPinIcon, WalletIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Service } from "@/types/services";

const ServiceInfoCard = ({ service }: { service: Service }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-start gap-3">
          <WalletIcon className="mt-0.5 size-4 shrink-0 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Starting price</p>
            <p className="font-semibold">৳{service.basePrice}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock3Icon className="mt-0.5 size-4 shrink-0 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Estimated duration</p>
            <p className="font-semibold">{service.estimatedDuration}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Service area</p>
            <p className="font-semibold">{service.serviceArea}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceInfoCard;
