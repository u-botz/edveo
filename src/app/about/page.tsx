import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us — Edveo | Built by Educators, for Educators",
  description:
    "Learn about Edveo's mission to make every educator financially independent. No commissions, no add-ons — just one platform for Indian coaching institutes.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
