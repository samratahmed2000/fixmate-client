import { Suspense } from "react";
import MyServicesSection from "@/app/components/technician/my-services/MyServicesSection";
import MyServicesSkeleton from "@/app/components/technician/my-services/MyServicesSkeleton";
import getCategories from "@/lib/api/getCategories";
import { getSession } from "@/lib/core/server";
import { getAllServices } from "@/lib/api/services";
import type { Category } from "@/types/category";

const MyServicesContent = async () => {
  const [session, allServices, categoryResponse] = await Promise.all([
    getSession(),
    getAllServices({ includePending: true }),
    getCategories(),
  ]);
  const categories: Category[] = Array.isArray(categoryResponse)
    ? categoryResponse
    : Array.isArray(categoryResponse?.data)
      ? categoryResponse.data
      : [];
  const technicianId = session?.user.id;
  const services = technicianId
    ? allServices.filter((service) => service.technicianId === technicianId)
    : [];

  return <MyServicesSection services={services} categories={categories} />;
};

const MyServicesPage = () => {
  return (
    <Suspense fallback={<MyServicesSkeleton />}>
      <MyServicesContent />
    </Suspense>
  );
};

export default MyServicesPage;
