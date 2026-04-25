import Link from "next/link";
import styles from "./ctaBanner.module.css";

export type CtaVariant = "dark" | "green" | "navy";

type Props = {
  variant?: CtaVariant;
  headline: string;
  /** Accent-coloured sub (e.g. "There's a Better Way.") – dark variant only */
  accentSub?: string;
  /** Normal sub-copy below headline */
  subheadline?: string;
  primaryLabel?: string;
  primaryId?: string;
  secondaryLabel?: string;
  /** Internal path (e.g. "/contact") or external URL */
  secondaryHref?: string;
  secondaryId?: string;
  /** Optional trust line items (e.g. "14-day free" · "No credit card") */
  trustItems?: string[];
};

export default function CtaBanner({
  variant = "dark",
  headline,
  accentSub,
  subheadline,
  primaryLabel = "Start Free Trial →",
  primaryId,
  secondaryLabel = "Talk to an Expert →",
  secondaryHref = "/contact",
  secondaryId,
  trustItems,
}: Props) {
  const isExternal = secondaryHref.startsWith("http");

  return (
    <section className={styles[variant]}>
      <h2 className={styles.headline}>{headline}</h2>

      {accentSub && <div className={styles.accentSub}>{accentSub}</div>}
      {subheadline && <p className={styles.sub}>{subheadline}</p>}

      <div className={styles.buttons}>
        <Link href="/register" className={styles.btnPrimary} id={primaryId}>
          {primaryLabel}
        </Link>
        {isExternal ? (
          <a
            href={secondaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
            id={secondaryId}
          >
            {secondaryLabel}
          </a>
        ) : (
          <Link href={secondaryHref} className={styles.btnSecondary} id={secondaryId}>
            {secondaryLabel}
          </Link>
        )}
      </div>

      {trustItems && trustItems.length > 0 && (
        <div className={styles.trustLine}>
          {trustItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      )}
    </section>
  );
}
