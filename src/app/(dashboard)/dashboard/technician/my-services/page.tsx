import { Suspense } from "react";
import MyServicesSection from "@/app/components/technician/my-services/MyServicesSection";
import MyServicesSkeleton from "@/app/components/technician/my-services/MyServicesSkeleton";
import { getSession } from "@/lib/core/server";
import { getAllServices } from "@/lib/api/services";

const MyServicesContent = async () => {
  const session = await getSession();
  const allServices = await getAllServices();
  const technicianId = session?.user.id;
  const services = technicianId
    ? allServices.filter((service) => service.technicianId === technicianId)
    : [];

  return <MyServicesSection services={services} />;
};

const MyServicesPage = () => {
  return (
    <Suspense fallback={<MyServicesSkeleton />}>
      <MyServicesContent />
    </Suspense>
  );
};

export default MyServicesPage;
