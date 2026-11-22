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

export type TechnicianBookingStatus =
  | "accepted"
  | "rejected"
  | "in-progress"
  | "completed";

export interface TechnicianBooking {
  _id: string;
  serviceId: string;
  customerName: string;
  phone: string;
  address: string;
  bookingDate: string;
  problemDescription: string;
  status: string;
  paymentStatus: string;
  finalAmount?: number;
  service: Pick<Service, "title" | "basePrice"> | null;
}

export type AdminBookingStatusFilter =
  | "all"
  | "requested"
  | "accepted"
  | "in-progress"
  | "completed"
  | "cancelled"
  | "rejected";

export interface AdminBooking {
  _id: string;
  service: Pick<Service, "title"> | null;
  customerName: string;
  technicianName: string;
  bookingDate: string;
  status: string;
  paymentStatus: string;
  amount: number | string | null;
}
