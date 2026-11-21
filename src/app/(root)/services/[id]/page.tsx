import { getServiceById } from "@/lib/api/services";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, WrenchIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RequestRepairCard from "@/app/components/services/RequestRepairCard";
import ServiceInfoCard from "@/app/components/services/ServiceInfoCard";
import { requireCustomerAccess } from "@/lib/core/server";

const ServiceDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  await requireCustomerAccess();

  const { id } = await params;

  if (!/^[a-f\d]{24}$/i.test(id)) {
    notFound();
  }

  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:py-12">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Back to services
      </Link>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="min-w-0 space-y-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted">
            {service.serviceImage ? (
              <Image
                src={service.serviceImage}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-muted-foreground">
                <WrenchIcon className="size-12" />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{service.category}</Badge>
              <Badge variant="outline">{service.serviceMode}</Badge>
            </div>
            <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {service.title}
            </h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>About This Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                {service.description}
              </p>
            </CardContent>
          </Card>

          <ServiceInfoCard service={service} />
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <RequestRepairCard service={service} />
        </aside>
      </div>
    </section>
  );
};

export default ServiceDetailsPage;
