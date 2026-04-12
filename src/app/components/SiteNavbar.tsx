import Link from "next/link";
import EdveoLogo from "./EdveoLogo";
import SegmentNav from "./SegmentNav";
import styles from "./siteNavbar.module.css";

export type NavPage = "home" | "solutions" | "pricing" | "resources" | "about" | "contact";

type Props = {
  activePage?: NavPage;
};

export default function SiteNavbar({ activePage }: Props) {
  return (
    <div className={styles.stickyWrapper}>
      <SegmentNav active="teachers" />
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navBrand}>
          <EdveoLogo variant="nav" />
        </Link>

        <div className={styles.navLinks}>
          <Link
            href="/solutions"
            className={activePage === "solutions" ? styles.navLinkActive : undefined}
          >
            Solutions
          </Link>
          <Link
            href="/pricing"
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
          <button type="button" className={styles.btnLogin}>
            Login
          </button>
          <button type="button" className={styles.btnTrial}>
            Start Free Trial
          </button>
        </div>
      </nav>
    </div>
  );
}
