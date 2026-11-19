import { CreditCard, Search, Send, Wrench } from "lucide-react";

export const steps = [
  {
    title: "Find a Service",
    description:
      "Browse repair categories & pick the service what matches your needs.",
    icon: Search,
  },
  {
    title: "Send a Request",
    description:
      "Share the issue, your address and a preferred time - it only takes a minute.",
    icon: Send,
  },
  {
    title: "Technician Fixes",
    description:
      "A verified FixMate technician arrives on schedule and completes the repair.",
    icon: Wrench,
  },
  {
    title: "Payment after Job",
    description: "Pay securely only after you are happy with the result.",
    icon: CreditCard,
  },
];
