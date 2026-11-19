import {
  Award,
  CheckCircle2,
  Clock,
  CreditCard,
  HelpCircle,
  House,
  Laptop,
  Leaf,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | FixMate - Smart Device & Appliance Repairs",
  description:
    "Learn about FixMate, the trusted smart device and home appliance repair service platform connecting you with verified technicians at your doorstep.",
};

export const keyFeatures = [
  {
    tag: "Doorstep Service",
    title: "On-Demand Doorstep Care",
    description:
      "Skip the traffic and hassle of carrying heavy equipment. Our verified technicians come directly to your home or office on your schedule.",
    icon: House,
  },
  {
    tag: "Verified Technicians",
    title: "100% Vetted Professionals",
    description:
      "Every technician goes through comprehensive background checks, rigorous technical skill assessments, and customer satisfaction monitoring.",
    icon: ShieldCheck,
  },
  {
    tag: "Pay After Repair",
    title: "Zero Risk, Pay on Satisfaction",
    description:
      "No upfront deposits or blind charges. Inspect and test your fully repaired device before making any payment safely and securely.",
    icon: CreditCard,
  },
  {
    tag: "Transparent Pricing",
    title: "Clear Quotes & Fair Rates",
    description:
      "Honest upfront diagnostics, clear price breakdowns, and authentic spare parts without surprise fees or arbitrary labor charges.",
    icon: CheckCircle2,
  },
  {
    tag: "Multi-Device Support",
    title: "Complete Device Ecosystem",
    description:
      "One single platform for all your repair needs-from smartphones, PCs, and laptops to refrigerators, ACs, and washing machines.",
    icon: Laptop,
  },
  {
    tag: "Service Warranty",
    title: "Guaranteed Workmanship",
    description:
      "Every successful repair is backed by our post-service warranty on spare parts and labor, providing lasting peace of mind.",
    icon: Award,
  },
];

export const customerServices = [
  "Fast online booking in under 2 minutes for home & office repairs",
  "Expert diagnostics for smartphones, laptops, ACs, Tvs, and more",
  "Doorstep arrival with certified tools and equipment",
  "Only genuine OEM and tested replacement components used",
  "Post-service testing with dedicated warranty coverage",
  "Multiple safe payment options after you inspect the completed job",
];

export const technicianServices = [
  "Direct access to a steady stream of verified local repair requests",
  "Complete schedule flexibility-choose when, where, and what to accept",
  "Guaranteed timely earnings with transparent and competitive platform fees",
  "Personal digital profile highlighting customer ratings and proven skills",
  "Free technical resources, scheduling dashboard, and dispute resolution",
  "Growth opportunities with top-rated technician perks and bonuses",
];

export const platformBenefits = [
  {
    title: "Speed & Reliability",
    description:
      "Quick response times with same-day emergency repair scheduling available so your routine never stays disrupted.",
    icon: Clock,
  },
  {
    title: "Safety & Integrity",
    description:
      "National ID verification, continuous criminal background checks, and transparent customer reviews ensure complete security.",
    icon: ShieldCheck,
  },
  {
    title: "Fair & Honest Ecosystem",
    description:
      "Competitive, standardized rates for customers while rewarding technicians with dignified, industry-leading income.",
    icon: Sparkles,
  },
  {
    title: "Customer-First Support",
    description:
      "Our dedicated care team is available 7 days a week to answer questions, guide requests, and honor warranties.",
    icon: HelpCircle,
  },
  {
    title: "Empowering Local Experts",
    description:
      "We champion local technical talent by connecting certified technicians directly with customers in their communities.",
    icon: Users,
  },
  {
    title: "Eco-Conscious Future",
    description:
      "Repairing instead of discarding prolongs the lifecycle of appliances, preventing harmful electronic waste.",
    icon: Leaf,
  },
];
