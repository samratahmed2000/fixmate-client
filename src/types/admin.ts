export type AdminUserRole = "customer" | "technician" | "admin";

export interface TechnicianApplication {
  category: string;
  serviceArea: string;
  bio: string;
  status: "pending" | "approved";
  submittedAt: string | null;
}

export interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: AdminUserRole;
  createdAt: string | null;
  technicianApplication?: TechnicianApplication | null;
}
