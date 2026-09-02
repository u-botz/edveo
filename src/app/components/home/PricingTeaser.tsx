import Link from "next/link";
import shell from "./home.module.css";
import styles from "./pricingTeaser.module.css";

/* Mirrors the "institutes" tab of /pricing — monthly rates. Kept deliberately
   short here; the full feature matrix lives on the pricing page. */
const PLANS = [
  {
    name: "Starter",
    price: "₹1,999",
    per: "/month",
    who: "New and small institutes finding their feet.",
    covers: "Up to 100 students · 1 branch · 5 staff",
    popular: false,
  },
  {
    name: "Growth",
    price: "₹3,999",
    per: "/month",
    who: "Growing institutes ready to run operations properly.",
    covers: "Up to 500 students · 2 branches · 15 staff",
    popular: true,
  },
  {
    name: "Pro",
    price: "Custom",
    per: "pricing",
    who: "Established institutes that need full control.",
    covers: "Unlimited students · branches · staff",
    popular: false,
  },
];

export default function PricingTeaser() {
  return (
    <section className={`${shell.section} ${shell.groundTint}`} id="pricing">
      <div className={shell.container}>
        <div className={shell.heading}>
          <span className={shell.eyebrow}>Pricing</span>
          <h2 className={shell.title}>Priced per institute, not per seat</h2>
          <p className={shell.subtitle}>
            No setup fee, no implementation charge, no per-teacher licence.
            Annual billing pays for ten months and gives you twelve.
          </p>
        </div>

        <ul className={styles.grid}>
          {PLANS.map((p) => (
            <li key={p.name} className={`${styles.card} ${p.popular ? styles.cardPopular : ""}`}>
              {p.popular && <span className={styles.badge}>Most institutes pick this</span>}
              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.who}>{p.who}</p>
              <div className={styles.priceRow}>
                <span className={styles.price}>{p.price}</span>
                <span className={styles.per}>{p.per}</span>
              </div>
              <p className={styles.covers}>{p.covers}</p>
              <Link href="/pricing" className={p.popular ? styles.ctaPrimary : styles.ctaGhost}>
                See what&apos;s included
              </Link>
            </li>
          ))}
        </ul>

        <p className={styles.foot}>
          Also priced for <Link href="/pricing" className={styles.footLink}>individual teachers</Link> and{" "}
          <Link href="/pricing" className={styles.footLink}>online academies</Link>.
        </p>
      </div>
    </section>
  );
}
