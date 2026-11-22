import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/bookings/bookings";
import type { CustomerPayment } from "@/types/bookings";

const PaymentHistoryTable = ({
  payments,
}: {
  payments: CustomerPayment[];
}) => (
  <div className="hidden overflow-hidden rounded-xl border bg-card shadow-xs md:block">
    <Table className="min-w-[900px]">
      <TableHeader>
        <TableRow className="bg-muted/30">
          <TableHead>Service</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Technician</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Payment Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id} className="hover:bg-muted/40">
            <TableCell>{payment.service || "—"}</TableCell>
            <TableCell className="max-w-56 truncate font-medium">
              {payment.title}
            </TableCell>
            <TableCell>{payment.technicianName || "—"}</TableCell>
            <TableCell className="text-right font-semibold tabular-nums">
              {payment.amount !== null ? `৳${payment.amount}` : "—"}
            </TableCell>
            <TableCell className="max-w-48 truncate font-mono text-xs">
              {payment.transactionId || "—"}
            </TableCell>
            <TableCell>{formatDateTime(payment.paymentDate)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default PaymentHistoryTable;
