import { Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoProps } from "@/types/navigation";

const Logo = ({ className }: LogoProps) => {
  return (
    <span
      data-slot="logo"
      className={cn(
        "inline-flex items-center gap-2 font-heading text-lg font-semibold tracking-tight",
        className,
      )}
    >
      <span className="flex items-end gap-1">
        <span
          aria-hidden="true"
          className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm"
        >
          <Wrench className="size-4" />
        </span>
        <span className="text-xl">FixMate</span>
      </span>
    </span>
  );
};

export default Logo;
