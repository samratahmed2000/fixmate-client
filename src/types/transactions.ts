export interface AdminTransaction {
  id: string;
  customerName: string;
  technicianName: string;
  serviceTitle: string;
  amount: number | null;
  transactionId: string | null;
  paymentDate: string | null;
}
