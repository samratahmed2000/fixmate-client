export type AuthRole = "customer" | "technician";

export interface AuthFormData {
  name: string;
  email: string;
  password: string;
  role: AuthRole;
}

export interface AuthFormProps {
  type: "sign-up" | "sign-in";
  className?: string;
}

export type FormInputProps = AuthFormProps;
