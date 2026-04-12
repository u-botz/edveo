import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us — Edveo | We Reply Within 2 Hours",
  description:
    "Get in touch with the Edveo team. Product demos, pricing questions, or technical support — we reply within 2 business hours on WhatsApp and email.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
