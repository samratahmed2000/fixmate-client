import { Sparkles } from "lucide-react";
import { getFeaturedServices } from "@/lib/api/services";
import { isServiceAvailable } from "@/lib/services/availability";
import ServicesCard from "@/app/components/services/ServicesCard";
import { Card, CardContent } from "@/components/ui/card";
import HomepageServiceActions from "../HomepageServiceActions";
import type { Service } from "@/types/services";

const FeaturedService = async () => {
  let services: Service[] = [];

  try {
    const allServices = await getFeaturedServices(6);
    services = allServices.filter(isServiceAvailable).slice(0, 6);
  } catch (error) {
    console.error("Failed to load featured services:", error);
  }

  return (
    <section
      aria-labelledby="featured-services"
      className="border-t bg-background"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Featured Services
          </span>
          <h2
            id="featured-services"
            className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Latest Repair Services
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-pretty text-muted-foreground sm:text-base">
            Explore recently added repair services from trusted technicians.
          </p>
        </div>

        {services.length > 0 ? (
          <>
            <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3">
              {services.map((service) => (
                <li key={service._id ?? service.title} className="h-full">
                  <ServicesCard service={service} />
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center">
              <HomepageServiceActions />
            </div>
          </>
        ) : (
          <Card className="mt-10 border-dashed">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              Featured services are temporarily unavailable.
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default FeaturedService;
