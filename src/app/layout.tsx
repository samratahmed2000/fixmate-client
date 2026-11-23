import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FixMate | Smart Device & Home Appliance Repair Service Platform",
  description:
    "FixMate is built to eliminate the stress of equipment breakdowns. We seamlessly connect homeowners and gadget users with vetted, certified technicians for fast, honest, and reliable doorstep repairs. With transparent pricing, genuine replacement parts, and zero upfront payments, we make repairs effortless from start to finish.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${inter.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
