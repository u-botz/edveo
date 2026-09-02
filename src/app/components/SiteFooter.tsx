import Link from "next/link";
import EdveoLogo from "./EdveoLogo";
import { COMPANY_WHATSAPP_URL } from "@/lib/companyPublicInfo";
import styles from "./siteFooter.module.css";

const NAV_COLS = [
  {
    title: "Platform",
    links: [
      { label: "Product", href: "/product" },
      { label: "Solutions", href: "/solutions" },
      { label: "Pricing", href: "/pricing" },
      { label: "For Institutions", href: "/institutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
] as const;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.panel}>
        <div className={styles.grid}>
          {/* Brand block — the footer leads with a statement, not a link list */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brandLink} aria-label="Edveo home">
              <EdveoLogo variant="footer" />
            </Link>

            <p className={styles.statement}>
              Built in Kerala.
              <br />
              <span className={styles.statementAccent}>For Indian educators.</span>
            </p>

            <p className={styles.desc}>
              The simplest way to run a coaching institute — fees, attendance, classes
              and students, all in one place.
            </p>
          </div>

          {NAV_COLS.map((col) => (
            <nav key={col.title} className={styles.linkCol} aria-label={col.title}>
              <h2 className={styles.colTitle}>{col.title}</h2>
              {col.links.map((link) => (
                <Link key={link.label} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}

          <div className={styles.linkCol}>
            <h2 className={styles.colTitle}>Talk to us</h2>
            <a
              href={COMPANY_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsapp}
            >
              <span className={styles.whatsappIcon}>
                <WhatsAppIcon />
              </span>
              WhatsApp
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 Edveo Technologies Pvt Ltd</span>
          <span className={styles.bottomMeta}>Made in Kerala, India</span>
        </div>
      </div>
    </footer>
  );
}
