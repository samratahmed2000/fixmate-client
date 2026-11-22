import { ReceiptTextIcon } from "lucide-react";
import AdminTransactionsView from "@/app/components/admin/transactions/AdminTransactionsView";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireAdminAccess } from "@/lib/core/server";
import { formatCurrency } from "@/lib/bookings/bookings";
import { getAdminPaymentTransactions } from "@/lib/stripe-payments";

const AdminTransactionsPage = async () => {
  await requireAdminAccess();
  const { transactions, totalRevenue } = await getAdminPaymentTransactions();

  return (
    <section className="space-y-5">
      <header className="space-y-1">
        <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Transactions
        </h1>
        <p className="text-sm text-muted-foreground">
          Review successful customer payments.
        </p>
      </header>

      <Card className="gap-4 border-border shadow-xs">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ReceiptTextIcon
              aria-hidden="true"
              className="size-4 text-primary"
            />
            <CardTitle>Total Revenue</CardTitle>
          </div>
          <CardDescription>
            Revenue from {transactions.length} successful{" "}
            {transactions.length === 1 ? "payment" : "payments"}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-heading text-3xl font-bold tabular-nums sm:text-4xl">
            {formatCurrency(totalRevenue)}
          </p>
        </CardContent>
      </Card>

      <AdminTransactionsView transactions={transactions} />
    </section>
  );
};

export default AdminTransactionsPage;
