import type { Service } from "./services";

export interface CreateBookingInput {
  serviceId: string;
  phone: string;
  address: string;
  preferredDate: string;
  problemDescription: string;
}

export interface RepairBookingsFormProps {
  service: Service;
  name: string;
  email: string;
  onCancel: () => void;
}

export interface CustomerBooking {
  _id: string;
  serviceId: string;
  bookingDate: string;
  status: string;
  paymentStatus?: string;
  finalAmount?: number | string;
  basePrice?: number | string;
  technicianName?: string;
  service: Pick<
    Service,
    "title" | "serviceImage" | "technicianName" | "basePrice"
  > | null;
}
