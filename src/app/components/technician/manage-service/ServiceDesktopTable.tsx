import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Category } from "@/types/category";
import type { Service } from "@/types/services";
import ServiceTableRow from "./ServiceTableRow";

const ServiceDesktopTable = ({
  services,
  categories,
}: {
  services: Service[];
  categories: Category[];
}) => {
  return (
    <div className="hidden md:block rounded-xl border bg-card shadow-xs overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="w-[320px]">Service</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Approval</TableHead>
            <TableHead className="text-center">Availability</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <ServiceTableRow
              key={service._id}
              service={service}
              categories={categories}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServiceDesktopTable;
