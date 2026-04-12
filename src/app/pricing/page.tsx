import type { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Pricing — Edveo",
  description: "Simple, transparent pricing for coaching institutes, online academies, and standalone teachers.",
};

export default function PricingPage() {
  return <PricingPageClient />;
}
