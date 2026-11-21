import { ArrowRightIcon, UserRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Service } from "@/types/services";

const RequestRepairCard = ({ service }: { service: Service }) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Starting price</CardDescription>
        <CardTitle className="font-heading text-2xl">
          ৳{service.basePrice}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Final cost may vary depending on the repair.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 border-t pt-4 text-sm">
          <UserRoundIcon className="size-4 shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground">
            {service.technicianName}
          </span>
        </div>
        <Button type="button" className="w-full">
          Request Repair
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default RequestRepairCard;
