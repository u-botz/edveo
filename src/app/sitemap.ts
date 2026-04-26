import type { MetadataRoute } from "next";
import { publicSiteUrl } from "@/lib/publicSiteUrl";

const entries: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/solutions", changeFrequency: "weekly", priority: 0.95 },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.95 },
  { path: "/institutions", changeFrequency: "weekly", priority: 0.9 },
  { path: "/teacher", changeFrequency: "weekly", priority: 0.9 },
  { path: "/edtech", changeFrequency: "weekly", priority: 0.85 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/login", changeFrequency: "monthly", priority: 0.5 },
  { path: "/register", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicSiteUrl();
  const lastModified = new Date();

  return entries.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
