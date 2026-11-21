import type { Service } from "@/types/services";
import ServiceCard from "./ServiceCard";

const ServiceMobileCards = ({ services }: { services: Service[] }) => {
  return (
    <div className="grid gap-3.5 md:hidden">
      {services.map((service) => (
        <ServiceCard
          key={service._id}
          service={service}
        />
      ))}
    </div>
  );
};

export default ServiceMobileCards;
