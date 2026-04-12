import type { Metadata } from "next";
import SolutionsPageClient from "./SolutionsPageClient";

export const metadata: Metadata = {
  title: "Solutions — Edveo | Courses, Payments, CRM & AI for Teachers",
  description:
    "Every tool a teacher or online academy needs — courses, payments, students, quizzes, branding, and AI — all live today. No add-ons. No commissions.",
};

export default function SolutionsPage() {
  return <SolutionsPageClient />;
}

