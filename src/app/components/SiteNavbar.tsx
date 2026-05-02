"use client";

import Link from "next/link";
import { useState } from "react";
import EdveoLogo from "./EdveoLogo";
import styles from "./siteNavbar.module.css";

export type NavPage = "home" | "solutions" | "pricing" | "resources" | "about" | "contact";

type Props = {
  activePage?: NavPage;
};

export default function SiteNavbar({ activePage }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.stickyWrapper}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navBrand}>
          <EdveoLogo variant="nav" />
        </Link>

        <div className={styles.navLinks}>
          <Link href="/solutions" className={activePage === "solutions" ? styles.navLinkActive : undefined}>Solutions</Link>
          <Link href="/pricing" className={activePage === "pricing" ? styles.navLinkActive : undefined}>Pricing</Link>
          <Link href="/about" className={activePage === "about" ? styles.navLinkActive : undefined}>About</Link>
          <Link href="/contact" className={activePage === "contact" ? styles.navLinkActive : undefined}>Contact</Link>
        </div>

        <div className={styles.navActions}>
          <Link href="/register" className={styles.btnTrial}>Start Free Trial</Link>
        </div>

        {/* Hamburger */}
        <button
          className={styles.mobileMenuBtn}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span className={styles.mobileMenuBar} />
          <span className={styles.mobileMenuBar} />
          <span className={styles.mobileMenuBar} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className={styles.mobileDrawer}>
          <Link href="/solutions" className={styles.mobileDrawerLink} onClick={() => setOpen(false)}>Solutions</Link>
          <Link href="/pricing" className={styles.mobileDrawerLink} onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/about" className={styles.mobileDrawerLink} onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" className={styles.mobileDrawerLink} onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/register" className={styles.mobileDrawerCta} onClick={() => setOpen(false)}>Start Free Trial →</Link>
        </div>
      )}
    </div>
  );
}
