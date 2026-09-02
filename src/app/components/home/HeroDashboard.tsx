import styles from "./heroDashboard.module.css";
import { HeroLeftCards, HeroAskPanel } from "./HeroSideCards";

/* Hero product shot: the Edveo admin dashboard rendered in markup rather than
   as an image, so it stays sharp, themeable and translatable. Numbers are
   representative of a mid-size institute — never presented as live data. */

const NAV = [
  { label: "Dashboard", d: "M3 12l9-9 9 9M5 10v10h14V10", active: true },
  { label: "Students", d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 .1" },
  { label: "Fees", d: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
  { label: "Attendance", d: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" },
  { label: "Batches", d: "M3 7h18M3 12h18M3 17h18" },
  { label: "Timetable", d: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" },
  { label: "Staff", d: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" },
];

const STATS = [
  { label: "Total students", value: "2,450", delta: "+12.4%", up: true, spark: [8, 12, 10, 16, 15, 21, 26], hue: "#0B5CFF" },
  { label: "Attendance today", value: "94.2%", delta: "+1.8%", up: true, spark: [14, 11, 17, 13, 19, 17, 24], hue: "#16C784" },
  { label: "Fees pending", value: "₹68,400", delta: "23 students", up: false, spark: [22, 18, 24, 15, 19, 12, 9], hue: "#EF4444" },
  { label: "New enquiries", value: "17", delta: "This week", up: true, spark: [6, 10, 9, 14, 12, 19, 23], hue: "#0B5CFF" },
];

/** Sparkline path across a fixed 92x26 box. */
function sparkPath(points: number[]): string {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  return points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 92;
      const y = 24 - ((p - min) / span) * 20;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

/* Monthly collection, in lakhs — drives the bar heights below. */
const BARS = [
  { m: "Apr", v: 52 }, { m: "May", v: 61 }, { m: "Jun", v: 44 },
  { m: "Jul", v: 70 }, { m: "Aug", v: 78 }, { m: "Sep", v: 96 },
];

const AT_RISK = [
  { n: "Arun Menon", i: "AM", why: "Absent 3 days running", tone: "warn" },
  { n: "Fathima R.", i: "FR", why: "Fee overdue by 12 days", tone: "bad" },
  { n: "Nikhil S.", i: "NS", why: "Test scores down 22%", tone: "warn" },
];

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

export default function HeroDashboard() {
  const peak = Math.max(...BARS.map((b) => b.v));

  return (
    <div className={styles.stage} aria-hidden="true">
      <HeroLeftCards />
      <HeroAskPanel />

      {/* ── Device ── */}
      <div className={styles.device}>
        <div className={styles.lid}>
          <span className={styles.camera} />

          <div className={styles.screen}>
            <span className={styles.glare} />

            <div className={styles.chrome}>
              <span className={styles.dots}>
                <i /><i /><i />
              </span>
              <span className={styles.urlBar}>app.edveo.in / dashboard</span>
            </div>

            <div className={styles.app}>
              <aside className={styles.sidebar}>
                <div className={styles.brandRow}>
                  <span className={styles.brandMark}>E</span>
                  <span className={styles.brandName}>Edveo</span>
                </div>
                <nav className={styles.nav}>
                  {NAV.map((n) => (
                    <span key={n.label} className={`${styles.navItem} ${n.active ? styles.navItemActive : ""}`}>
                      <span className={styles.navIcon}><Icon d={n.d} /></span>
                      {n.label}
                    </span>
                  ))}
                </nav>
              </aside>

              <div className={styles.main}>
                <header className={styles.topbar}>
                  <div>
                    <div className={styles.crumb}>Mentora LearnX · Manjeri</div>
                    <div className={styles.pageTitle}>Dashboard</div>
                  </div>
                  <div className={styles.topRight}>
                    <span className={styles.searchBox}>Search students…</span>
                    <span className={styles.avatarSm}>SN</span>
                  </div>
                </header>

                <div className={styles.statRow}>
                  {STATS.map((s) => (
                    <div key={s.label} className={styles.statTile}>
                      <div className={styles.statLabel}>{s.label}</div>
                      <div className={styles.statValue}>{s.value}</div>
                      <div className={`${styles.statDelta} ${s.up ? styles.deltaUp : styles.deltaFlat}`}>
                        {s.delta}
                      </div>
                      <svg className={styles.spark} viewBox="0 0 92 26" preserveAspectRatio="none" aria-hidden>
                        <path d={sparkPath(s.spark)} fill="none" stroke={s.hue} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  ))}
                </div>

                <div className={styles.panels}>
                  <section className={styles.chartPanel}>
                    <div className={styles.panelHead}>
                      <span className={styles.panelTitle}>Fee collection</span>
                      <span className={styles.panelMeta}>Last 6 months</span>
                    </div>
                    <div className={styles.chart}>
                      {BARS.map((b, i) => (
                        <div key={b.m} className={styles.barCol}>
                          <div
                            className={`${styles.bar} ${i === BARS.length - 1 ? styles.barPeak : ""}`}
                            style={{ height: `${(b.v / peak) * 100}%` }}
                          />
                          <span className={styles.barLabel}>{b.m}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className={styles.riskPanel}>
                    <div className={styles.panelHead}>
                      <span className={styles.panelTitle}>Needs attention</span>
                      <span className={styles.panelBadge}>3</span>
                    </div>
                    <ul className={styles.riskList}>
                      {AT_RISK.map((r) => (
                        <li key={r.n} className={styles.riskRow}>
                          <span className={styles.riskAvatar}>{r.i}</span>
                          <span className={styles.riskText}>
                            <span className={styles.riskName}>{r.n}</span>
                            <span className={styles.riskWhy}>{r.why}</span>
                          </span>
                          <span className={`${styles.riskFlag} ${r.tone === "bad" ? styles.flagBad : styles.flagWarn}`} />
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop base — slightly wider than the lid, with a hinge notch */}
        <div className={styles.base}>
          <span className={styles.notch} />
        </div>
      </div>
    </div>
  );
}
