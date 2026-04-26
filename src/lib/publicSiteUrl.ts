/**
 * Canonical origin for sitemap.xml and robots.txt (no trailing slash).
 *
 * Defaults to https://edveo.co so URLs always match your production property in
 * Google Search Console. We intentionally do not use VERCEL_URL (*.vercel.app),
 * because GSC rejects sitemaps when loc URLs use a different host than the property.
 *
 * Override when needed (e.g. staging): set NEXT_PUBLIC_SITE_URL.
 */
const DEFAULT_SITE = "https://edveo.co";

export function publicSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "");
  }
  return DEFAULT_SITE;
}
