import { Service } from "./services";

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
