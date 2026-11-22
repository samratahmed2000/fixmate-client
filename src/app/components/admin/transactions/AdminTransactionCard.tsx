import { Card } from "@/components/ui/card";
import { formatCurrency, formatDateTime } from "@/lib/bookings/bookings";
import type { AdminTransaction } from "@/types/transactions";

const AdminTransactionCard = ({
  transaction,
}: {
  transaction: AdminTransaction;
}) => (
  <Card className="gap-4 p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">Service</p>
        <h2 className="mt-1 truncate font-semibold">
          {transaction.serviceTitle}
        </h2>
      </div>
      <p className="shrink-0 font-semibold tabular-nums">
        {formatCurrency(transaction.amount)}
      </p>
    </div>

    <div className="grid gap-3 border-y py-3 text-sm sm:grid-cols-2">
      <div>
        <p className="text-xs text-muted-foreground">Customer</p>
        <p className="mt-1 font-medium">{transaction.customerName}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Technician</p>
        <p className="mt-1 font-medium">{transaction.technicianName || "—"}</p>
      </div>
      <div>
        <p className="text-[10px] text-muted-foreground">Payment Date</p>
        <p className="mt-1 font-medium">
          {formatDateTime(transaction.paymentDate)}
        </p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Transaction ID</p>
        <p className="mt-1 break-all font-mono text-xs">
          {transaction.transactionId || "—"}
        </p>
      </div>
    </div>
  </Card>
);

export default AdminTransactionCard;
