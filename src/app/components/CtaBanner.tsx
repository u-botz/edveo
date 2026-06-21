import Link from "next/link";
import { COMPANY_WHATSAPP_CTA_URL } from "@/lib/companyPublicInfo";
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
  /** Optional trust line items (e.g. "Free forever" · "No credit card") */
  trustItems?: string[];
};

export default function CtaBanner({
  variant = "dark",
  headline,
  accentSub,
  subheadline,
  primaryLabel = "Get a free demo →",
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
        <a href={COMPANY_WHATSAPP_CTA_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary} id={primaryId}>
          {primaryLabel}
        </a>
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
