import { Suspense } from "react";
import MyServicesSection from "@/app/components/technician/my-services/MyServicesSection";
import MyServicesSkeleton from "@/app/components/technician/my-services/MyServicesSkeleton";
import getCategories from "@/lib/api/getCategories";
import { requireDashboardRole } from "@/lib/core/server";
import { getAllServices } from "@/lib/api/services";
import type { Category } from "@/types/category";

const MyServicesContent = async () => {
  // The API scopes `includePending=true` requests to the signed-in technician.
  const [services, categoryResponse] = await Promise.all([
    getAllServices({ includePending: true }),
    getCategories(),
  ]);
  const categories: Category[] = Array.isArray(categoryResponse)
    ? categoryResponse
    : Array.isArray(categoryResponse?.data)
      ? categoryResponse.data
      : [];

  return <MyServicesSection services={services} categories={categories} />;
};

const MyServicesPage = async () => {
  await requireDashboardRole("technician");

  return (
    <Suspense fallback={<MyServicesSkeleton />}>
      <MyServicesContent />
    </Suspense>
  );
};

export default MyServicesPage;
