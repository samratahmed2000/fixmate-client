export type AdminUserRole = "customer" | "technician" | "admin";

export interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: AdminUserRole;
  createdAt: string | null;
}
