import Link from "next/link";
import EdveoLogo from "../components/EdveoLogo";
import { COMPANY_WHATSAPP_CTA_URL } from "@/lib/companyPublicInfo";
import styles from "../components/siteNavbar.module.css";

export type NavPage = "solutions" | "pricing" | "about" | "contact";

type Props = {
  activePage?: NavPage;
};

export default function InstitutionsNav({ activePage }: Props) {
  return (
    <div className={styles.stickyWrapper}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navBrand}>
          <EdveoLogo variant="nav" />
        </Link>

        <div className={styles.navLinks}>
          <Link
            href="/institutions#features"
            className={activePage === "solutions" ? styles.navLinkActive : undefined}
          >
            Features
          </Link>
          <Link
            href="/institutions#pricing"
            className={activePage === "pricing" ? styles.navLinkActive : undefined}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className={activePage === "about" ? styles.navLinkActive : undefined}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={activePage === "contact" ? styles.navLinkActive : undefined}
          >
            Contact
          </Link>
        </div>

        <div className={styles.navActions}>

          <a href={COMPANY_WHATSAPP_CTA_URL} target="_blank" rel="noopener noreferrer" className={styles.btnTrial}>
            Book a Demo
          </a>
        </div>
      </nav>
    </div>
  );
}
