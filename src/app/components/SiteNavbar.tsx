"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import EdveoLogo from "./EdveoLogo";
import { COMPANY_WHATSAPP_CTA_URL } from "@/lib/companyPublicInfo";
import styles from "./siteNavbar.module.css";

export type NavPage = "home" | "solutions" | "pricing" | "resources" | "about" | "contact" | "product";

type Props = {
  /** Retained so existing pages keep compiling; the bar no longer renders section links. */
  activePage?: NavPage;
};

export default function SiteNavbar({ activePage: _activePage }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // The bar is white glass with dark text, so it may only turn opaque once it
    // is over light ground. Flipping on a fixed offset put a grey slab on top of
    // the dark hero, so the threshold tracks the hero's actual height instead.
    const hero = document.querySelector<HTMLElement>("[data-hero]");

    const handleScroll = () => {
      const threshold = hero
        ? hero.offsetHeight - 120
        : 80; // pages without a dark hero flip almost immediately
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.stickyWrapper} ${scrolled ? styles.stickyWrapperScrolled : ''}`}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navBrand} aria-label="Edveo home">
          <EdveoLogo variant="nav" />
        </Link>

        <div className={styles.navActions}>
          <a
            href={COMPANY_WHATSAPP_CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnTrial}
          >
            Book A Demo
          </a>
        </div>
      </nav>
    </div>
  );
}
