import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/bookings/bookings";
import type { CustomerPayment } from "@/types/bookings";

const PaymentHistoryCard = ({ payment }: { payment: CustomerPayment }) => (
  <Card className="gap-4 p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <Badge variant="secondary">{payment.service || "Service"}</Badge>
        <h2 className="mt-2 truncate font-semibold">{payment.title}</h2>
      </div>
      <p className="shrink-0 font-semibold tabular-nums">
        {payment.amount !== null ? `৳${payment.amount}` : "—"}
      </p>
    </div>

    <div className="grid gap-3 border-y py-3 text-sm">
      <div>
        <p className="text-xs text-muted-foreground">Technician</p>
        <p className="mt-1 font-medium">{payment.technicianName || "—"}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Transaction ID</p>
        <p className="mt-1 break-all font-mono text-xs">
          {payment.transactionId || "—"}
        </p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Payment Date</p>
        <p className="mt-1 font-medium">
          {formatDateTime(payment.paymentDate)}
        </p>
      </div>
    </div>
  </Card>
);

export default PaymentHistoryCard;
