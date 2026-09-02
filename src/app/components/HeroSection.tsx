import Link from "next/link";
import { COMPANY_WHATSAPP_CTA_URL } from "@/lib/companyPublicInfo";
import styles from "./hero.module.css";
import HeroDashboard from "./home/HeroDashboard";
import HeroBackdrop from "./home/HeroBackdrop";
import HeadlineRotator from "./home/HeadlineRotator";

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export function TeacherIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
      <path d="M2 20c0-4 4-7 10-7s10 3 10 7" />
    </svg>
  );
}

export function EdtechIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8l3 3-3 3" />
      <path d="M13 14h4" />
    </svg>
  );
}

export function InstitutionIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className={styles.heroSection} data-hero>
      <div className={styles.heroBackground}>
        <HeroBackdrop />
      </div>
      <div className={styles.heroContainer}>
        
        {/* Eyebrow — product line */}
        <div className={styles.eyebrowBadgeSolo}>
          <span className={styles.eyebrowBadgeText}>Powered by Edveo Intelligence™</span>
        </div>

        {/* Headline */}
        <h1 className={styles.heroHeadline}>
          Run Your Institution.
          <br />
          <HeadlineRotator />
        </h1>

        {/* Sub-headline */}
        <p className={styles.heroSub}>
          <span className={styles.heroSubLine}>Missed enquiries cost you admissions. Unpaid fees cost you revenue.</span>
          <span className={styles.heroSubLine}>Edveo&apos;s agents handle both — automatically, 24/7.</span>
        </p>

        {/* Actions */}
        <div className={styles.heroActions}>
          <a href={COMPANY_WHATSAPP_CTA_URL} target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>
            Book a Live Demo <ArrowRightIcon />
          </a>
          <Link href="/product" className={styles.secondaryButton}>
            <span className={styles.playIcon}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            See How It Works
          </Link>
        </div>

        {/* Product shot */}
        <HeroDashboard />

      </div>
    </section>
  );
}
