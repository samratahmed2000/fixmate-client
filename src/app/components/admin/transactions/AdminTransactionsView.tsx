import { ReceiptTextIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Card } from "@/components/ui/card";
import type { AdminTransaction } from "@/types/transactions";
import AdminTransactionCard from "./AdminTransactionCard";
import AdminTransactionsTable from "./AdminTransactionsTable";

const AdminTransactionsView = ({
  transactions,
}: {
  transactions: AdminTransaction[];
}) => {
  if (transactions.length === 0) {
    return (
      <Card className="border-dashed py-12">
        <Empty>
          <EmptyMedia variant="icon">
            <ReceiptTextIcon aria-hidden="true" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No transactions yet</EmptyTitle>
            <EmptyDescription>
              Successful booking payments will appear here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Card>
    );
  }

  return (
    <>
      <AdminTransactionsTable transactions={transactions} />
      <div className="space-y-3 md:hidden">
        {transactions.map((transaction) => (
          <AdminTransactionCard
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </div>
    </>
  );
};

export default AdminTransactionsView;
