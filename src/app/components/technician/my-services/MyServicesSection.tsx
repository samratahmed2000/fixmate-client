import Link from "next/link";
import { PlusIcon, WrenchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { MyServicesSectionProps } from "@/types/services";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import MyServicesTable from "./MyServicesTable";

const MyServicesSection = ({ services, categories }: MyServicesSectionProps) => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            My Services
          </h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            View the repair services you have added.
          </p>
        </div>

        <Button
          nativeButton={false}
          render={<Link href="/dashboard/technician/add-service" />}
        >
          <PlusIcon data-icon="inline-start" />
          Add Service
        </Button>
      </div>

      {services.length === 0 ? (
        <Card className="border-dashed py-12">
          <Empty>
            <EmptyMedia variant="icon">
              <WrenchIcon className="size-6 text-primary" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>No services added yet</EmptyTitle>
              <EmptyDescription>
                Add your first repair service to see it listed here.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                nativeButton={false}
                render={<Link href="/dashboard/technician/add-service" />}
              >
                <PlusIcon data-icon="inline-start" />
                Add Your First Service
              </Button>
            </EmptyContent>
          </Empty>
        </Card>
      ) : (
        <MyServicesTable services={services} categories={categories} />
      )}
    </section>
  );
};

export default MyServicesSection;
