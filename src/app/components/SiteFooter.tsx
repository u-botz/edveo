import EdveoLogo from "./EdveoLogo";
import styles from "./siteFooter.module.css";

const NAV_COLS = [
  {
    title: "Product",
    links: [
      { label: "Solutions", href: "/solutions" },
      { label: "Pricing", href: "/pricing" },
      { label: "For Institutions", href: "/institutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
] as const;

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Brand column */}
          <div className={styles.footerLinkCol}>
            <a href="/" className={styles.footerBrandLink}>
              <EdveoLogo variant="footer" />
            </a>
            <p className={styles.footerDesc}>
              The AI-native platform built for every Indian educator — whether you
              teach online, run an edtech, or manage a coaching institute.
            </p>
          </div>

          {/* Link columns */}
          {NAV_COLS.map((col) => (
            <div key={col.title} className={styles.footerLinkCol}>
              <h4>{col.title}</h4>
              {col.links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.footerBottom}>
          <div>
            © 2026 Edveo Technologies Pvt Ltd. Proudly built for Indian
            educators.
          </div>
        </div>
      </div>
    </footer>
  );
}
