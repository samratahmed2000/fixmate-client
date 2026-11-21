import type { Service } from "@/types/services";
import { ServiceDesktopTable, ServiceMobileCards } from "../manage-service";

const MyServicesTable = ({ services }: { services: Service[] }) => {
  return (
    <>
      <ServiceDesktopTable services={services} />
      <ServiceMobileCards services={services} />
    </>
  );
};

export default MyServicesTable;
