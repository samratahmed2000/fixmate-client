"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import SelectField from "@/app/components/shared/SelectField";
import type { Category } from "@/types/category";
import type { TechnicianApplication } from "@/types/admin";
import type { SelectOption } from "@/lib/services/service-options";

type Props = {
  name: string;
  email: string;
  categories: Category[];
};

const TechnicianApplicationForm = ({ name, email, categories }: Props) => {
  const router = useRouter();
  const [category, setCategory] = React.useState("");
  const [serviceArea, setServiceArea] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [application, setApplication] =
    React.useState<TechnicianApplication | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const categoryOptions: SelectOption[] = categories.map((item) => ({
    value: item.title,
    label: item.title,
  }));

  React.useEffect(() => {
    let isCurrent = true;

    fetch("/api/technician-applications", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(
            result.message || "Failed to load application status",
          );
        }
        if (isCurrent && result.data) {
          setApplication(result.data as TechnicianApplication);
        }
      })
      .catch((cause: unknown) => {
        if (isCurrent) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Failed to load application status",
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/technician-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, serviceArea, bio }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application");
      }

      setApplication(result.data as TechnicianApplication);
      toast.add({
        title: "Application Submitted",
        description: result.message,
        type: "success",
      });
      router.push("/dashboard/customer");
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Failed to submit application",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isLoading || isSubmitting || !!application;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technician Application</CardTitle>
        <CardDescription>
          Tell us about your specialty and service area. An admin will review
          your application before your account is upgraded.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {application ? (
          <div
            role="status"
            className="mb-5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm"
          >
            <p className="font-semibold">
              {application.status === "approved"
                ? "Your application has been approved."
                : "Your application is pending admin approval."}
            </p>
            <p className="mt-1 text-muted-foreground">
              {application.category} · {application.serviceArea}
            </p>
          </div>
        ) : null}

        {error ? (
          <p
            role="alert"
            className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
          >
            {error}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          <FieldGroup className="gap-5">
            <Field>
              <FieldLabel>Account Information</FieldLabel>
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap">
                <Badge
                  variant="outline"
                  className="max-w-full gap-1.5 px-3 py-1.5"
                >
                  <span className="font-semibold">Name</span>
                  <span className="truncate font-normal">{name || "—"}</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="max-w-full gap-1.5 px-3 py-1.5"
                >
                  <span className="font-semibold">Email</span>
                  <span className="truncate font-normal">{email}</span>
                </Badge>
              </div>
            </Field>

            <SelectField
              id="technician-category"
              label="Service Category"
              required
              placeholder="Select your specialty"
              value={category}
              onValueChange={setCategory}
              options={categoryOptions}
              disabled={isDisabled || categories.length === 0}
              description={
                categories.length === 0
                  ? "No categories are available right now. Please try again later."
                  : undefined
              }
            />

            <Field>
              <FieldLabel htmlFor="technician-service-area">
                Service Area
                <span aria-hidden="true" className="text-destructive">
                  *
                </span>
              </FieldLabel>
              <Input
                id="technician-service-area"
                value={serviceArea}
                onChange={(event) => setServiceArea(event.target.value)}
                placeholder="e.g. Dhanmondi, Dhaka"
                maxLength={150}
                required
                disabled={isDisabled}
              />
            </Field>

            <Field>
              <div className="flex items-center justify-between gap-3">
                <FieldLabel htmlFor="technician-bio">
                  Bio
                  <span aria-hidden="true" className="text-destructive">
                    *
                  </span>
                </FieldLabel>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {bio.length}/1000
                </span>
              </div>
              <Textarea
                id="technician-bio"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="Describe your experience and the services you provide."
                maxLength={1000}
                rows={5}
                required
                disabled={isDisabled}
              />
            </Field>
          </FieldGroup>

          {!application ? (
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={
                isDisabled ||
                categories.length === 0 ||
                !category ||
                !serviceArea.trim() ||
                !bio.trim()
              }
            >
              {isLoading
                ? "Loading application status…"
                : isSubmitting
                  ? "Submitting…"
                  : "Submit Application"}
            </Button>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
};

export default TechnicianApplicationForm;
