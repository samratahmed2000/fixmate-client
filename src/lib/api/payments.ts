import "server-only";
import { baseUrl } from "@/lib/utils";
import { serverApiFetch } from "@/lib/api/server-fetch";
import type { AdminTransaction } from "@/types/transactions";

type ApiResult = Record<string, unknown>;

const isRecord = (value: unknown): value is ApiResult =>
  typeof value === "object" && value !== null;

const getApiData = async (path: string, init?: RequestInit): Promise<unknown> => {
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await serverApiFetch(`${baseUrl}/api/payments/${path}`, {
    cache: "no-store",
    ...init,
  });
  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new Error("The server returned an invalid payment response");
  }

  if (!response.ok) {
    throw new Error(
      isRecord(result) && typeof result.message === "string"
        ? result.message
        : "Failed to fetch payment data",
    );
  }
  if (!isRecord(result) || !("data" in result)) {
    throw new Error("The server returned invalid payment data");
  }
  return result.data;
};

export const confirmStripeCheckout = async (sessionId: string) => {
  const data = await getApiData("confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId }),
  });
  if (
    !isRecord(data) ||
    typeof data.amount !== "number" ||
    typeof data.transactionId !== "string" ||
    (data.paymentDate !== null && typeof data.paymentDate !== "string")
  ) {
    throw new Error("The server returned invalid payment confirmation data");
  }
  return {
    amount: data.amount,
    transactionId: data.transactionId,
    paymentDate: data.paymentDate,
  };
};

export const getAdminPaymentTransactions = async (): Promise<{
  transactions: AdminTransaction[];
  totalRevenue: number;
}> => {
  const data = await getApiData("admin");
  const isTransaction = (value: unknown): value is AdminTransaction =>
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.customerName === "string" &&
    typeof value.technicianName === "string" &&
    typeof value.serviceTitle === "string" &&
    (value.amount === null || typeof value.amount === "number") &&
    (value.transactionId === null || typeof value.transactionId === "string") &&
    (value.paymentDate === null || typeof value.paymentDate === "string");

  if (
    !isRecord(data) ||
    !Array.isArray(data.transactions) ||
    !data.transactions.every(isTransaction) ||
    typeof data.totalRevenue !== "number"
  ) {
    throw new Error("The server returned invalid transaction data");
  }

  return {
    transactions: data.transactions,
    totalRevenue: data.totalRevenue,
  };
};
