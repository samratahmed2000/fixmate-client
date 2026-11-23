import "server-only";
import { baseUrl } from "@/lib/utils";
import { serverApiFetch } from "@/lib/api/server-fetch";
import type { DashboardHistoryEntry } from "@/types/dashboard-overview";

type DashboardStat = { title: string; value: number };
type ApiResult = Record<string, unknown>;

const isRecord = (value: unknown): value is ApiResult =>
  typeof value === "object" && value !== null;

const getApiData = async (path: string): Promise<unknown> => {
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await serverApiFetch(`${baseUrl}/api/dashboard/${path}`, {
    cache: "no-store",
  });
  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new Error("The server returned an invalid dashboard response");
  }

  if (!response.ok) {
    throw new Error(
      isRecord(result) && typeof result.message === "string"
        ? result.message
        : "Failed to fetch dashboard data",
    );
  }
  if (!isRecord(result) || !("data" in result)) {
    throw new Error("The server returned invalid dashboard data");
  }
  return result.data;
};

export const getDashboardOverview = async (): Promise<DashboardStat[]> => {
  const data = await getApiData("overview");
  if (
    !Array.isArray(data) ||
    !data.every(
      (item) =>
        isRecord(item) &&
        typeof item.title === "string" &&
        typeof item.value === "number",
    )
  ) {
    throw new Error("The server returned invalid dashboard overview data");
  }
  return data as DashboardStat[];
};

export const getDashboardHistory = async (): Promise<
  DashboardHistoryEntry[]
> => {
  const data = await getApiData("history");
  if (
    !Array.isArray(data) ||
    !data.every(
      (item) =>
        isRecord(item) &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.detail === "string" &&
        typeof item.status === "string" &&
        (item.createdAt === null || typeof item.createdAt === "string"),
    )
  ) {
    throw new Error("The server returned invalid dashboard history data");
  }
  return data as DashboardHistoryEntry[];
};
