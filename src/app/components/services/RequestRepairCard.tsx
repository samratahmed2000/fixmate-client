"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, UserRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSession } from "@/lib/auth-client";
import { hasActiveServiceBooking } from "@/lib/actions/bookings";
import { toast } from "@/components/ui/toast";
import type { Service } from "@/types/services";
import RepairBookingsForm from "@/app/components/bookings/RepairBookingsForm";

const RequestRepairCard = ({ service }: { service: Service }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [checkedBookingKey, setCheckedBookingKey] = useState<string | null>(
    null,
  );
  const [hasActiveBooking, setHasActiveBooking] = useState(false);
  const serviceId = service._id;
  const bookingKey =
    session?.user.role === "customer" && serviceId
      ? `${session.user.id}:${serviceId}`
      : null;

  useEffect(() => {
    if (isPending || !bookingKey || !serviceId) return;

    let isCurrent = true;

    hasActiveServiceBooking(serviceId)
      .then((hasActiveBooking) => {
        if (isCurrent) {
          setCheckedBookingKey(bookingKey);
          setHasActiveBooking(hasActiveBooking);
        }
      })
      .catch((error: unknown) => {
        if (!isCurrent) return;

        toast.add({
          title: "Unable to check booking status",
          description:
            error instanceof Error
              ? error.message
              : "Please try again before submitting your request.",
          type: "error",
        });
        setCheckedBookingKey(bookingKey);
        setHasActiveBooking(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [bookingKey, isPending, serviceId]);

  const bookingStatus = isPending
    ? "checking"
    : !bookingKey
      ? "available"
      : checkedBookingKey !== bookingKey
        ? "checking"
        : hasActiveBooking
          ? "active"
          : "available";

  const openRequestForm = () => {
    if (isPending) return;

    if (session?.user.role !== "customer") {
      router.push("/sign-in");
      return;
    }

    setIsDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardDescription>Starting price</CardDescription>
          <CardTitle className="font-heading text-2xl">
            ৳{service.basePrice}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Final cost may vary depending on the repair.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 border-t pt-4 text-sm">
            <UserRoundIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-muted-foreground">
              {service.technicianName}
            </span>
          </div>
          {bookingStatus === "active" ? (
            <div className="space-y-2">
              <Button type="button" disabled className="w-full">
                Requested
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                You can request this service again if the technician cancels
                your booking.
              </p>
            </div>
          ) : (
            <Button
              type="button"
              onClick={openRequestForm}
              disabled={isPending || bookingStatus === "checking" || !serviceId}
              className="w-full cursor-pointer"
            >
              Request Repair
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg p-8">
          <DialogHeader>
            <DialogTitle>Booking Repair</DialogTitle>
            <DialogDescription>
              Fill in your details to request {service.title}.
            </DialogDescription>
          </DialogHeader>
          <RepairBookingsForm
            service={service}
            name={session?.user.name ?? ""}
            email={session?.user.email ?? ""}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestRepairCard;
