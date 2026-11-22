import { Suspense } from "react";
import ServicesCard from "@/app/components/services/ServicesCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllServices } from "@/lib/api/services";
import { WrenchIcon } from "lucide-react";
import { requireCustomerAccess } from "@/lib/core/server";
import { isServiceAvailable } from "@/lib/services/availability";

const ServicesList = async () => {
  let allServices: Awaited<ReturnType<typeof getAllServices>>;
  try {
    allServices = await getAllServices();
  } catch (error) {
    console.error("Failed to load available services:", error);

    return (
      <Card className="border-dashed">
        <CardContent className="py-10 text-center">
          <h2 className="font-heading text-lg font-semibold">
            Services are temporarily unavailable
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Please try again later. If the problem continues, contact support.
          </p>
        </CardContent>
      </Card>
    );
  }

  const services = allServices.filter(isServiceAvailable);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-semibold">
          Available services
        </h2>
        <Badge variant="secondary">
          {services.length} {services.length === 1 ? "service" : "services"}
        </Badge>
      </div>

      {services.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServicesCard
              key={service._id ?? service.title}
              service={service}
            />
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <WrenchIcon className="size-6" />
            </span>
            <h2 className="font-heading text-lg font-semibold">
              No services available yet
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Please check back later to find available repair services.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
};

const ServicesSkeleton = () => (
  <>
    <div className="flex items-center justify-between">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-5 w-20 rounded-full" />
    </div>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="aspect-video w-full rounded-none" />
          <CardContent className="space-y-4 p-4">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  </>
);

const ServicesPage = async () => {
  await requireCustomerAccess();

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">FixMate Services</p>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Find a repair service
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Browse local repair services and choose the one that works for you.
        </p>
      </header>

      <div className="space-y-5">
        <Suspense fallback={<ServicesSkeleton />}>
          <ServicesList />
        </Suspense>
      </div>
    </section>
  );
};

export default ServicesPage;
