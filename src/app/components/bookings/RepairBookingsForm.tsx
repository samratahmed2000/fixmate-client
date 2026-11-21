"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { bookingService } from "@/lib/actions/bookings";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { RepairBookingsFormProps } from "@/types/bookings";

const RepairBookingsForm = ({
  service,
  name,
  email,
  onCancel,
}: RepairBookingsFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const date = new Date();
  const minDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const handleServiceBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const serviceId = service._id;
    if (!serviceId) {
      toast.add({
        title: "Booking failed",
        description:
          "This service is unavailable. Please choose another service.",
        type: "error",
      });
      return;
    }

    const formData = new FormData(event.currentTarget);
    const booking = {
      serviceId,
      phone: String(formData.get("phone") ?? "").trim(),
      address: String(formData.get("address") ?? "").trim(),
      preferredDate: String(formData.get("preferredDate") ?? ""),
      problemDescription: String(
        formData.get("problemDescription") ?? "",
      ).trim(),
    };

    setIsSubmitting(true);

    try {
      await bookingService(booking);
      toast.add({
        title: "Repair request submitted",
        description: `Successfully booked ${service.title}.`,
        type: "success",
      });
      router.push("/dashboard/customer/bookings");
    } catch (error) {
      toast.add({
        title: "Booking failed",
        description:
          error instanceof Error
            ? error.message
            : "Please try submitting your repair request again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleServiceBooking}>
      <Field>
        <FieldLabel htmlFor="repair-name">Name</FieldLabel>
        <div
          id="repair-name"
          className="flex min-h-9 items-center rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground"
        >
          {name || "Name not available"}
        </div>
      </Field>

      <Field>
        <FieldLabel>Email</FieldLabel>
        <div
          aria-readonly="true"
          id="email"
          className="flex min-h-9 items-center rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground"
        >
          {email || "Email not available"}
        </div>
      </Field>

      <Field>
        <FieldLabel htmlFor="repair-phone">Phone</FieldLabel>
        <Input
          id="repair-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Your phone number"
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="repair-address">Address</FieldLabel>
        <Input
          id="repair-address"
          name="address"
          autoComplete="street-address"
          placeholder="Where should the technician visit?"
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="repair-date">Preferred Date</FieldLabel>
        <Input
          id="repair-date"
          name="preferredDate"
          type="date"
          min={minDate}
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="repair-description">
          Problem Description
        </FieldLabel>
        <Textarea
          id="repair-description"
          name="problemDescription"
          placeholder="Describe the problem with your device or appliance."
          minLength={20}
          maxLength={400}
          required
          className="min-h-28 resize-y"
        />
        <p className="text-xs text-muted-foreground">
          Enter 20 to 400 characters.
        </p>
      </Field>

      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </form>
  );
};

export default RepairBookingsForm;
