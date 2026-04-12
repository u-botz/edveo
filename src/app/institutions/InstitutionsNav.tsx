"use client";

import Link from "next/link";
import SegmentNav from "../components/SegmentNav";
import styles from "./institutions.module.css";

export default function InstitutionsNav() {
  function handlePrintPdf() {
    window.print();
  }

  return (
    <div className={styles.instNavHeaderSticky}>
      <SegmentNav active="institutions" />
      <nav className={styles.instNav}>
        <div className={styles.instNavInner}>
          <Link href="/" className={styles.instLogoLink}>
            <span className={styles.instLogoMark} aria-hidden />
            <span className={styles.instLogoText}>Edveo</span>
          </Link>
          <div className={styles.instNavActions}>
            <Link href="/" className={`${styles.instNavHome} ${styles.noPrint}`}>
              Home
            </Link>
            <button type="button" className={`${styles.instNavPdf} ${styles.noPrint}`} onClick={handlePrintPdf}>
              Download as PDF
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
