import type { Service } from "@/types/services";
import type { Category } from "@/types/category";
import { ServiceDesktopTable, ServiceMobileCards } from "../manage-service";

const MyServicesTable = ({
  services,
  categories,
}: {
  services: Service[];
  categories: Category[];
}) => {
  return (
    <>
      <ServiceDesktopTable services={services} categories={categories} />
      <ServiceMobileCards services={services} categories={categories} />
    </>
  );
};

export default MyServicesTable;
