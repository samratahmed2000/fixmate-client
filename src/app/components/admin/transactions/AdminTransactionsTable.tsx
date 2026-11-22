import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDateTime } from "@/lib/bookings/bookings";
import type { AdminTransaction } from "@/types/transactions";

const AdminTransactionsTable = ({
  transactions,
}: {
  transactions: AdminTransaction[];
}) => (
  <div className="hidden overflow-x-auto rounded-xl border bg-card shadow-xs md:block">
    <Table className="min-w-262.5">
      <TableHeader>
        <TableRow className="bg-muted/30">
          <TableHead>Customer</TableHead>
          <TableHead>Technician</TableHead>
          <TableHead>Service</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Payment Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id} className="hover:bg-muted/40">
            <TableCell className="font-medium">
              {transaction.customerName}
            </TableCell>
            <TableCell>{transaction.technicianName || "—"}</TableCell>
            <TableCell className="max-w-56 truncate">
              {transaction.serviceTitle}
            </TableCell>
            <TableCell className="text-right font-semibold tabular-nums">
              {formatCurrency(transaction.amount)}
            </TableCell>
            <TableCell className="max-w-56 truncate font-mono text-xs">
              {transaction.transactionId || "—"}
            </TableCell>
            <TableCell>{formatDateTime(transaction.paymentDate)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default AdminTransactionsTable;
