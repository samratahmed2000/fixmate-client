import { cn } from "@/lib/utils";

const STRENGTH_SEGMENTS = [
  { id: "length", test: (p: string) => p.length >= 6 },
  {
    id: "case",
    test: (p: string) => /[A-Z]/.test(p) && /[a-z]/.test(p),
  },
  { id: "number", test: (p: string) => /[0-9]/.test(p) },
  { id: "special", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
] as const;

const PasswordStrengthBar = ({ password }: { password: string }) => {
  const hasInput = password.length > 0;
  return (
    <div className="mt-2 space-y-1.5">
      {/* 4 segment bars */}
      <div className="flex gap-1.5" role="group" aria-label="Password strength">
        {STRENGTH_SEGMENTS.map(({ id, test }) => {
          const met = hasInput && test(password);
          return (
            <div
              key={id}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-300",
                !hasInput ? "bg-muted" : met ? "bg-green-500" : "bg-muted",
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PasswordStrengthBar;
