import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edveo for Offline Institutes — Sales Deck",
  description:
    "One platform for fee register, attendance, leads, and course management. Built for institute owners.",
};

export default function InstitutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
