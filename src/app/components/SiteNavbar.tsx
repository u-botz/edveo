"use client";

import Link from "next/link";
import { useState } from "react";
import EdveoLogo from "./EdveoLogo";
import { COMPANY_WHATSAPP_CTA_URL } from "@/lib/companyPublicInfo";
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
          <Link href="/product" className={activePage === "product" as any ? styles.navLinkActive : undefined}>Product</Link>
          <Link href="/solutions" className={activePage === "solutions" ? styles.navLinkActive : undefined}>Solutions</Link>
          <Link href="/pricing" className={activePage === "pricing" ? styles.navLinkActive : undefined}>Pricing</Link>
          <Link href="/about" className={activePage === "about" ? styles.navLinkActive : undefined}>About</Link>
          <Link href="/contact" className={activePage === "contact" ? styles.navLinkActive : undefined}>Contact</Link>
        </div>

        <div className={styles.navActions}>
          <a href={COMPANY_WHATSAPP_CTA_URL} target="_blank" rel="noopener noreferrer" className={styles.btnTrial}>
            <span>Book A Demo</span>
            <span className={styles.btnTrialIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </a>
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
          <Link href="/product" className={styles.mobileDrawerLink} onClick={() => setOpen(false)}>Product</Link>
          <Link href="/solutions" className={styles.mobileDrawerLink} onClick={() => setOpen(false)}>Solutions</Link>
          <Link href="/pricing" className={styles.mobileDrawerLink} onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/about" className={styles.mobileDrawerLink} onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" className={styles.mobileDrawerLink} onClick={() => setOpen(false)}>Contact</Link>
          <a href={COMPANY_WHATSAPP_CTA_URL} target="_blank" rel="noopener noreferrer" className={styles.mobileDrawerCta} onClick={() => setOpen(false)}>Get a free demo →</a>
        </div>
      )}
    </div>
  );
}
