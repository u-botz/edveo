import EdveoLogo from "./EdveoLogo";
import styles from "./siteFooter.module.css";

const NAV_COLS = [
  {
    title: "Product",
    links: [
      { label: "Solutions", href: "/solutions" },
      { label: "LMS Suite", href: "#" },
      { label: "Fee Management", href: "#" },
      { label: "Student CRM", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "API Status", href: "#" },
      { label: "Tutorials", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Compliance", href: "#" },
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
              Transforming Education for Indian Coaching Institutes. Connecting
              workflow, elevating results, and managing scale smoothly.
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
            © 2024 Edveo Technologies Pvt Ltd. Proudly built for Indian
            educators.
          </div>
        </div>
      </div>
    </footer>
  );
}
