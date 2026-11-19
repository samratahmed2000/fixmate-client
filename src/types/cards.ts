import { LucideIcon } from "lucide-react";

export interface StepCardProps {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}
