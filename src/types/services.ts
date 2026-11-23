import type { Category } from "./category";

export type ServiceMode = "Home Visit" | "Shop Drop Off";
export type DurationUnit = "Minutes" | "Hours" | "Days";
export type ApprovalStatus = "Pending" | "Approved" | "Rejected";
export type ApprovalStatusFilter = "all" | "pending" | "approved" | "rejected";
export type AvailabilityStatus = "Active" | "Not-Active";

export type ServiceFormErrors = Partial<
  Record<keyof ServiceFormValues | "general", string>
>;

export interface Service {
  _id?: string;
  title: string;
  category: string;
  description: string;
  basePrice: string;
  estimatedDuration: string;
  serviceMode: string;
  serviceArea: string;
  serviceImage: string;
  technicianName: string;
  technicianEmail: string;
  technicianId?: string;
  approvalStatus?: ApprovalStatus;
  availability?: AvailabilityStatus;
  isActive?: boolean;
  createdAt?: string;
}

/** Fields a technician is allowed to submit; everything else is server-owned. */
export type ServiceInput = Pick<
  Service,
  | "title"
  | "category"
  | "description"
  | "basePrice"
  | "estimatedDuration"
  | "serviceMode"
  | "serviceArea"
  | "serviceImage"
>;

export type InsertedService = {
  acknowledged: boolean;
  insertedId: string;
};

export interface ServiceFormValues {
  title: string;
  category: string;
  description: string;
  basePrice: string;
  durationValue: string;
  durationUnit: DurationUnit;
  serviceMode: ServiceMode | "";
  serviceArea: string;
  imageFile: File | null;
  existingImage?: string;
}

export interface ServiceFormProps {
  categories: Category[];
  mode?: "add" | "update";
  initialData?: Partial<Service>;
  serviceId?: string;
  technicianId?: string;
  technicianName?: string;
  technicianEmail?: string;
  submitButtonText?: string;
  onSuccess?: () => void;
  onSubmit?: (service: ServiceInput) => Promise<unknown>;
}

export interface DurationFieldProps {
  id?: string;
  value: string;
  unit: DurationUnit;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: DurationUnit) => void;
  error?: string;
  disabled?: boolean;
}

export interface TechnicianInfoCardProps {
  technicianName?: string;
  technicianEmail?: string;
}

export type TechnicianFieldsProps = {
  name?: string;
  email?: string;
};

export interface ServiceSubmitOptions {
  mode?: "add" | "update";
  serviceId?: string;
  values: ServiceFormValues;
  existingImageUrl?: string;
  setErrors: React.Dispatch<React.SetStateAction<ServiceFormErrors>>;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  router?: { push: (url: string) => void; refresh?: () => void };
  onSubmit?: (service: ServiceInput) => Promise<unknown>;
  onSuccess?: () => void;
}

export interface ServiceDetailsCardProps {
  isUpdate?: boolean;
  values: ServiceFormValues;
  errors: ServiceFormErrors;
  categories: Category[];
  categoryOptions: { value: string; label: string }[];
  isSubmitting: boolean;
  updateField: <K extends keyof ServiceFormValues>(
    key: K,
    value: ServiceFormValues[K],
  ) => void;
  initialImageUrl?: string;
}

export interface PricingAvailabilityCardProps {
  values: ServiceFormValues;
  errors: ServiceFormErrors;
  isSubmitting: boolean;
  updateField: <K extends keyof ServiceFormValues>(
    key: K,
    value: ServiceFormValues[K],
  ) => void;
}

export interface ServiceImageUploadProps {
  id?: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  existingImageUrl?: string;
  error?: string;
  disabled?: boolean;
}

export interface MyServicesSectionProps {
  services: Service[];
  categories: Category[];
}
