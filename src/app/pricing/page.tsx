import type { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Pricing — Edveo",
  description: "Simple, transparent pricing for online academies and educators.",
};

/**
 * `?segment=online|teachers|institutes` opens that tab — the Teacher, EdTech and Institutions pages
 * link here that way. Read on the server (not useSearchParams) so the plans stay in the rendered HTML.
 */
export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { segment } = await searchParams;
  return <PricingPageClient initialSegment={typeof segment === "string" ? segment : undefined} />;
}
