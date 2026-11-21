import type { Service } from "@/types/services";
import type { Category } from "@/types/category";
import ServiceCard from "./ServiceCard";

const ServiceMobileCards = ({
  services,
  categories,
}: {
  services: Service[];
  categories: Category[];
}) => {
  return (
    <div className="grid gap-3.5 md:hidden">
      {services.map((service) => (
        <ServiceCard
          key={service._id}
          service={service}
          categories={categories}
        />
      ))}
    </div>
  );
};

export default ServiceMobileCards;
