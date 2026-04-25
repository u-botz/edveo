import Link from "next/link";
import styles from "../teacher/audience.module.css";

export default function InstitutionsSalesContent() {
  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroIntro}>
            <div className={styles.badge}>🏫 FOR OFFLINE INSTITUTES</div>
            <h1 className={styles.heroTitle}>
              Stop Running Your Institute
              <br />
              <span className={styles.accent}>on 4 Different Tools.</span>
            </h1>
            <p className={styles.heroSub}>
              Edveo replaces your fee register, attendance sheet, WhatsApp leads, and course management — one platform, one subscription, live today.
            </p>
          </div>

          <div className={styles.heroVisualRow}>
            {/* Chaos panel — 4 tools being replaced */}
            <div className={styles.checkPanel}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#ef4444", marginBottom: "4px" }}>What you use today</p>
              {[
                { icon: "💬", label: "WhatsApp", sub: "Leads, reminders, parent comms" },
                { icon: "📊", label: "Excel / Google Sheets", sub: "Fee tracking, attendance" },
                { icon: "📋", label: "Google Forms", sub: "Enrollment, feedback" },
                { icon: "📄", label: "Paper registers", sub: "Attendance, timetable" },
              ].map((tool) => (
                <div key={tool.label} className={styles.checkItem} style={{ opacity: 0.85 }}>
                  <div className={styles.checkMark} style={{ background: "#fee2e2" }}>
                    <span style={{ fontSize: "10px" }}>✗</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, color: "#374151" }}>{tool.icon} {tool.label}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#9ca3af" }}>{tool.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Unified panel */}
            <div className={styles.statPanel}>
              <div className={styles.statPanelChrome}>
                <span className={styles.statDot} style={{ background: "#FF5F57" }} />
                <span className={styles.statDot} style={{ background: "#FFBD2E" }} />
                <span className={styles.statDot} style={{ background: "#27C93F" }} />
                <span className={styles.statPanelUrl}>institute.edveo.com</span>
              </div>
              <div className={styles.statRow}>
                <div className={styles.statCard}>
                  <div className={styles.statLabel}>Fees Collected</div>
                  <div className={styles.statValue}>₹4.2L</div>
                  <div className={styles.statSub}>This month</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statLabel}>Pending</div>
                  <div className={styles.statValue}>₹1.1L</div>
                  <div className={styles.statSub}>Auto-reminder sent</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Attendance Today</div>
                <div className={styles.statValue}>87%</div>
                <div className={styles.statSub}>Parents notified instantly</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Pain table ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What Your Institute Runs on Today</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>What You&apos;re Doing</th>
                  <th>The Problem It Creates</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fee collection via cash + UPI links</td>
                  <td>No tracking, leakage, manual follow-up</td>
                </tr>
                <tr>
                  <td>Attendance in paper registers</td>
                  <td>Parents can&apos;t see it, no analytics</td>
                </tr>
                <tr>
                  <td>Leads managed in WhatsApp groups</td>
                  <td>Inquiries fall through, no pipeline</td>
                </tr>
                <tr>
                  <td>Timetable on whiteboard / Excel</td>
                  <td>Conflicts, teacher clashes, no visibility</td>
                </tr>
                <tr>
                  <td>Courses shared via Google Drive</td>
                  <td>No progress tracking, no security</td>
                </tr>
                <tr>
                  <td>3–4 separate subscriptions</td>
                  <td>Paying for tools that don&apos;t talk to each other</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.callout}>
            <strong>The average institute loses ₹40,000–₹80,000/year in fee leakage alone</strong> from manual collection. Edveo fixes this on day one.
          </p>
        </div>
      </section>

      {/* ── Section 3: Three pillars ── */}
      <section id="features" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.megaTitle}>One Platform. Three Engines. Zero Overlap.</h2>

          {/* Pillar 1 — ERP */}
          <article className={styles.pillarBlock}>
            <div className={styles.pillarGrid}>
              <div>
                <p className={styles.pillarLabel}>Enterprise Resource Planning</p>
                <h3 className={styles.pillarHeadline}>Your Operations. Automated.</h3>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <h4>Fee Management</h4>
                    <p>Collect fees online, generate GST invoices automatically, track pending payments, send automated reminders via WhatsApp and SMS — without chasing a single student manually.</p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>Attendance & Timetable</h4>
                    <p>Digital attendance with one tap. Parents get notified instantly. Timetable scheduling with zero conflicts — teachers, rooms, and batches managed from one screen.</p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>Branch Management</h4>
                    <p>Running multiple branches? See every branch&apos;s performance, fees, and attendance from one dashboard. No more calling each center for reports.</p>
                  </div>
                </div>
              </div>
              <div className={styles.pillarVisual}>
                <div className={styles.earningsMock}>
                  <div className={styles.earningsMockRow}>
                    <div className={styles.earningsTile}>
                      <div className={styles.earningsLbl}>Collected</div>
                      <div className={styles.earningsNum}>₹4.2L</div>
                    </div>
                    <div className={`${styles.earningsTile} ${styles.earningsTileAccent}`}>
                      <div className={styles.earningsLbl}>Pending</div>
                      <div className={styles.earningsNum}>₹1.1L</div>
                    </div>
                  </div>
                  <div className={styles.earningsSub}>✓ Automated reminder sent to 23 students</div>
                </div>
              </div>
            </div>
          </article>

          {/* Pillar 2 — CRM */}
          <article className={styles.pillarBlock}>
            <div className={`${styles.pillarGrid} ${styles.pillarGridRev}`}>
              <div>
                <p className={styles.pillarLabel}>Customer Relationship Management</p>
                <h3 className={styles.pillarHeadline}>Never Lose a Lead Again.</h3>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <h4>Lead Pipeline</h4>
                    <p>Every inquiry — walk-in, WhatsApp, phone call, website form — captured in one pipeline. Assign to staff, track follow-ups, see conversion rates by source.</p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>AI Lead Scoring</h4>
                    <p>Edveo Intelligence automatically scores and prioritises leads. Your staff knows exactly who to call first and when.</p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>Enrollment Automation</h4>
                    <p>Lead converts → student profile created → fee structure assigned → WhatsApp welcome sent. Zero manual steps.</p>
                  </div>
                </div>
              </div>
              <div className={styles.pillarVisual}>
                <div className={styles.kanban}>
                  {[
                    { title: "New Inquiry", cards: ["NEET batch", "Weekend demo"] },
                    { title: "Follow-up", cards: ["Called — ring"] },
                    { title: "Enrolled", cards: ["Aanya K."] },
                  ].map((col) => (
                    <div key={col.title} className={styles.kanCol}>
                      <div className={styles.kanColTitle}>{col.title}</div>
                      {col.cards.map((c) => (
                        <div key={c} className={styles.kanCard}>{c}</div>
                      ))}
                    </div>
                  ))}
                </div>
                <p className={styles.kanStats}>
                  <strong>42</strong> new inquiries this week · <strong>12</strong> converted
                </p>
              </div>
            </div>
          </article>

          {/* Pillar 3 — LMS */}
          <article className={styles.pillarBlock}>
            <div className={styles.pillarGrid}>
              <div>
                <p className={styles.pillarLabel}>Learning Management System</p>
                <h3 className={styles.pillarHeadline}>Teach Online and Offline. Both.</h3>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <h4>Course Delivery</h4>
                    <p>Upload recorded videos, PDFs, and notes. Students access everything from their portal — no WhatsApp file sharing, no Google Drive links.</p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>AI Quiz Builder</h4>
                    <p>Generate a 50-question quiz from any chapter in 30 seconds. Auto-graded, performance tracked, results shared with parents instantly.</p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>Student Progress</h4>
                    <p>See every student&apos;s attendance, assignment completion, quiz scores, and fee status in one unified profile. Identify at-risk students before they drop.</p>
                  </div>
                </div>
              </div>
              <div className={styles.pillarVisual}>
                <div className={styles.profileCard}>
                  <div className={styles.profileName}>Student profile</div>
                  <div className={styles.profileGrid}>
                    <div className={styles.profileStat}>
                      <div className={styles.profileStatLabel}>Attendance</div>
                      <div className={`${styles.profileStatVal} ${styles.profileStatValGreen}`}>87%</div>
                    </div>
                    <div className={styles.profileStat}>
                      <div className={styles.profileStatLabel}>Fees</div>
                      <div className={styles.profileStatVal}>Paid</div>
                    </div>
                    <div className={styles.profileStat}>
                      <div className={styles.profileStatLabel}>Last quiz</div>
                      <div className={styles.profileStatVal}>73%</div>
                    </div>
                    <div className={styles.profileStat}>
                      <div className={styles.profileStatLabel}>Courses</div>
                      <div className={styles.profileStatVal}>3 active</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ── Section 4: AI ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>The Only Platform Where AI Sees Your Entire Institute.</h2>
          <p className={styles.sectionSub}>
            Not just your sales funnel. Edveo Intelligence™ connects fees, attendance, leads, and course performance into one institutional brain.
          </p>
          <div className={styles.aiGrid}>
            <div className={styles.aiCol}>
              <h3 className={styles.aiColTitle}>🎓 Predicts</h3>
              <ul>
                <li>Fee defaults 7 days before due</li>
                <li>Enrollment conversion rate by source</li>
                <li>Peak inquiry seasons</li>
              </ul>
            </div>
            <div className={styles.aiCol}>
              <h3 className={styles.aiColTitle}>📊 Detects</h3>
              <ul>
                <li>Students at risk of dropping</li>
                <li>Attendance anomalies</li>
                <li>Content gaps in courses</li>
              </ul>
            </div>
            <div className={styles.aiCol}>
              <h3 className={styles.aiColTitle}>⚡ Automates</h3>
              <ul>
                <li>Follow-up sequences for leads</li>
                <li>Fee reminder messages</li>
                <li>Quiz generation from syllabus</li>
              </ul>
            </div>
          </div>
          <p className={styles.competitor}>
            Classplus AI manages your sales funnel. Edveo Intelligence™ runs your entire institute.
          </p>
        </div>
      </section>

      {/* ── Section 5: Go live ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>You&apos;re Live Before You Leave This Meeting.</h2>
          <div className={styles.steps}>
            <div className={styles.stepCard}>
              <div className={styles.stepTime}>STEP 1 — 2 MINUTES</div>
              <p className={styles.stepBody}>Sign up with your institute details</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepTime}>STEP 2 — 5 MINUTES</div>
              <p className={styles.stepBody}>Add your courses, batches & fee structure</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepTime}>STEP 3 — DONE</div>
              <p className={styles.stepBody}>Students enroll, fees collected, leads tracked</p>
            </div>
          </div>
          <p className={styles.stepNote}>
            <strong>No implementation partner. No IT team. No 6-week onboarding.</strong>
            <br />
            Our team sets up your account with you — right now.
          </p>
        </div>
      </section>

      {/* ── Section 6: Pricing ── */}
      <section id="pricing" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Simple Pricing. No Hidden Fees.</h2>
          <p className={styles.pricingSub}>No setup fee. No implementation charge. Cancel anytime.</p>
          <div className={styles.priceGrid}>
            <div className={styles.priceCard}>
              <div className={styles.priceTier}>Starter</div>
              <div className={styles.priceAmount}>₹3,499/mo</div>
              <ul>
                <li>Up to 200 students</li>
                <li>LMS + ERP + CRM</li>
                <li>Fee collection + attendance</li>
                <li>Digital timetable</li>
              </ul>
              <Link href="/register" className={styles.priceBtn}>Start Free Trial</Link>
            </div>
            <div className={`${styles.priceCard} ${styles.priceCardFeatured}`}>
              <div className={styles.priceTier}>Professional</div>
              <div className={styles.priceAmount}>₹6,999/mo</div>
              <ul>
                <li>Up to 1,000 students</li>
                <li>Everything in Starter</li>
                <li>WhatsApp CRM + AI scoring</li>
                <li>Multi-batch management</li>
              </ul>
              <Link href="/register" className={styles.priceBtn}>Start Free Trial</Link>
            </div>
            <div className={styles.priceCard}>
              <div className={styles.priceTier}>Business</div>
              <div className={styles.priceAmount}>₹12,999/mo</div>
              <ul>
                <li>Unlimited students</li>
                <li>Everything in Pro</li>
                <li>Multi-branch + dedicated AM</li>
                <li>White-label app</li>
                <li>Priority support SLA</li>
              </ul>
              <button type="button" className={`${styles.priceBtn} ${styles.priceBtnOutline}`}>Contact Sales</button>
            </div>
          </div>
          <p className={styles.priceReassure}>
            All plans include <strong>Edveo Intelligence™</strong> — AI across every module. No add-ons.
          </p>
        </div>
      </section>

      {/* ── Section 7: Final CTA ── */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <h2 className={styles.finalTitle}>Start Your Free Trial Right Now.</h2>
          <p className={styles.finalSub}>
            14 days. Full access. No credit card.
            <br />
            We&apos;ll set up your institute profile together — it takes 7 minutes.
          </p>
          <Link href="/register" className={styles.finalBtn}>Start Free Trial →</Link>
          <p className={styles.finalTrust}>99.9% uptime SLA · Data stored in India · Cancel anytime</p>
        </div>
      </section>
    </>
  );
}
