"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import { notifyDashboardDataUpdated } from "@/lib/dashboard/refresh";
import type { AdminUser } from "@/types/admin";
import AdminUsersTable from "./AdminUsersTable";

const AdminUsersView = () => {
  const [users, setUsers] = React.useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [approvingUserId, setApprovingUserId] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    let isCurrent = true;

    fetch("/api/admin/users", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch users");
        }
        if (isCurrent) setUsers(Array.isArray(result.data) ? result.data : []);
      })
      .catch((cause: unknown) => {
        if (isCurrent) {
          setError(
            cause instanceof Error ? cause.message : "Failed to fetch users",
          );
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const handleApprove = async (userId: string) => {
    setApprovingUserId(userId);
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to approve technician");
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                role: "technician",
                technicianApplication: user.technicianApplication
                  ? { ...user.technicianApplication, status: "approved" }
                  : null,
              }
            : user,
        ),
      );
      notifyDashboardDataUpdated();
      toast.add({
        title: "Application Approved",
        description: "The customer account is now a technician account.",
        type: "success",
      });
    } catch (cause) {
      toast.add({
        title: "Approval Failed",
        description:
          cause instanceof Error
            ? cause.message
            : "Failed to approve technician application",
        type: "error",
      });
    } finally {
      setApprovingUserId(null);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 border-b pb-3 last:border-0">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-56" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-10 text-center">
          <p className="font-medium">Unable to load users</p>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Registered accounts</p>
        <Badge variant="secondary">
          {users.length} {users.length === 1 ? "user" : "users"}
        </Badge>
      </div>

      {users.length > 0 ? (
        <AdminUsersTable
          users={users}
          approvingUserId={approvingUserId}
          onApprove={handleApprove}
        />
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No registered users found.
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminUsersView;
