"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ApprovalStatusFilter, Service } from "@/types/services";
import AdminServicesDesktopTable from "./AdminServicesDesktopTable";
import AdminServicesMobileCards from "./AdminServicesMobileCards";

const statusOptions: { value: ApprovalStatusFilter; label: string }[] = [
  { value: "all", label: "All Services" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const AdminServicesView = () => {
  const [status, setStatus] = React.useState<ApprovalStatusFilter>("pending");
  const [services, setServices] = React.useState<Service[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const fetchServices = React.useCallback(async () => {
    setError("");
    try {
      const response = await fetch(
        `/api/admin/services?status=${encodeURIComponent(status)}`,
        { cache: "no-store" },
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setServices(Array.isArray(result.data) ? result.data : []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Failed to fetch services");
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  React.useEffect(() => {
    let isCurrent = true;
    fetch(
      `/api/admin/services?status=${encodeURIComponent(status)}`,
      { cache: "no-store" },
    )
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        if (isCurrent) setServices(Array.isArray(result.data) ? result.data : []);
      })
      .catch((cause) => {
        if (isCurrent) {
          setError(cause instanceof Error ? cause.message : "Failed to fetch services");
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [status]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              type="button"
              size="sm"
              variant={status === option.value ? "default" : "outline"}
              onClick={() => {
                setIsLoading(true);
                setStatus(option.value);
              }}
            >
              {option.label}
            </Button>
          ))}
        </div>
        {!isLoading && !error ? (
          <Badge variant="secondary">
            {services.length} {services.length === 1 ? "service" : "services"}
          </Badge>
        ) : null}
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3 border-b pb-3 last:border-0">
                <Skeleton className="size-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : error ? (
        <Card className="border-dashed">
          <CardContent className="py-10 text-center">
            <p className="font-medium">Unable to load services</p>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      ) : services.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No {status === "all" ? "" : `${status} `}services found.
          </CardContent>
        </Card>
      ) : (
        <>
          <AdminServicesDesktopTable
            services={services}
            onUpdated={() => void fetchServices()}
          />
          <AdminServicesMobileCards
            services={services}
            onUpdated={() => void fetchServices()}
          />
        </>
      )}
    </div>
  );
};

export default AdminServicesView;
