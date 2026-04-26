/**
 * Public canonical site origin (no trailing slash).
 * Set NEXT_PUBLIC_SITE_URL in production, e.g. https://www.edveo.com
 */
export function publicSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_URL) {
    const host = process.env.VERCEL_URL.replace(/^https?:\/\//, "");
    return `https://${host}`.replace(/\/+$/, "");
  }
  return "https://edveo.com";
}
