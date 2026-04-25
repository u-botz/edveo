import Link from "next/link";
import EdveoLogo from "../components/EdveoLogo";
import SiteFooter from "../components/SiteFooter";
import navStyles from "../components/siteNavbar.module.css";
import styles from "../teacher/audience.module.css";

function EdtechNav() {
  return (
    <div className={navStyles.stickyWrapper}>
      <nav className={navStyles.navbar}>
        <Link href="/" className={navStyles.navBrand}>
          <EdveoLogo variant="nav" />
        </Link>
        <div className={navStyles.navLinks}>
          <Link href="/edtech#features">Features</Link>
          <Link href="/edtech#pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className={navStyles.navActions}>
          <Link href="/login" className={navStyles.btnLogin}>Login</Link>
          <Link href="/register" className={navStyles.btnTrial}>Book a Demo</Link>
        </div>
      </nav>
    </div>
  );
}

export default function EdtechPage() {
  return (
    <main className={styles.salesMain}>
      <EdtechNav />
      <EdtechContent />
      <SiteFooter />
    </main>
  );
}

function EdtechContent() {
  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroIntro}>
            <div className={styles.badge}>🚀 FOR ONLINE ACADEMIES & EDTECH COMPANIES</div>
            <h1 className={styles.heroTitle}>
              Scale Your Edtech from
              <br />
              <span className={styles.accent}>100 to 100,000 Students.</span>
            </h1>
            <p className={styles.heroSub}>
              Multi-instructor LMS + AI-powered CRM + revenue analytics — one platform built for edtech companies that are serious about growth. White-label, India-hosted, zero revenue cut.
            </p>
          </div>
          <div className={styles.heroVisualRow}>
            <div className={styles.statPanel}>
              <div className={styles.statPanelChrome}>
                <span className={styles.statDot} style={{ background: "#FF5F57" }} />
                <span className={styles.statDot} style={{ background: "#FFBD2E" }} />
                <span className={styles.statDot} style={{ background: "#27C93F" }} />
                <span className={styles.statPanelUrl}>youracademy.com</span>
              </div>
              <div className={styles.statRow}>
                <div className={styles.statCard}>
                  <div className={styles.statLabel}>Monthly Revenue</div>
                  <div className={styles.statValue}>₹8.4L</div>
                  <div className={styles.statSub}>+22% MoM growth</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statLabel}>Active Students</div>
                  <div className={styles.statValue}>4,218</div>
                  <div className={styles.statSub}>186 enrolled today</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Lead-to-Enroll Rate</div>
                <div className={styles.statValue}>34%</div>
                <div className={styles.statSub}>AI-scored pipeline · 612 active leads</div>
              </div>
            </div>

            <div className={styles.checkPanel}>
              {[
                "Multi-instructor management — unlimited teachers per academy",
                "White-label branding — your domain, your app, your identity",
                "AI lead scoring surfaces your hottest prospects first",
                "CRM pipeline from first inquiry to enrollment, automated",
                "Revenue analytics broken down by course, batch, and instructor",
                "Data stored in India — IT Act compliant for B2B contracts",
              ].map((item) => (
                <div key={item} className={styles.checkItem}>
                  <div className={styles.checkMark}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2 6l3 3 5-5" stroke="#2EAA6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className={styles.checkText}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Pain table ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What Growing Edtechs Run Into</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>The Growing Pain</th>
                  <th>What It Actually Costs You</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Stitching together 4–6 SaaS tools</td>
                  <td>₹50K–₹2L/month in subscriptions, data silos, no unified view</td>
                </tr>
                <tr>
                  <td>Managing instructors in WhatsApp groups</td>
                  <td>No visibility into who's teaching what, dropped batches, disputes</td>
                </tr>
                <tr>
                  <td>Leads captured in Google Sheets</td>
                  <td>Follow-ups missed, no pipeline stage tracking, revenue predictability = zero</td>
                </tr>
                <tr>
                  <td>Revenue leakage from Udemy / third-party LMS</td>
                  <td>30–50% platform cut + no student data ownership</td>
                </tr>
                <tr>
                  <td>No attribution on which course converts leads best</td>
                  <td>Marketing spend wasted on low-converting channels</td>
                </tr>
                <tr>
                  <td>Scaling ops manually — hiring for every function</td>
                  <td>Headcount bloats before revenue does</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.callout}>
            <strong>The average edtech wastes ₹1.2L–₹3L/month</strong> running disconnected tools that don&apos;t share data. Edveo collapses all of it into one subscription.
          </p>
        </div>
      </section>

      {/* ── Section 3: Feature pillars ── */}
      <section id="features" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.megaTitle}>One Platform. Three Growth Engines.</h2>

          {/* Pillar 1 — LMS */}
          <article className={styles.pillarBlock}>
            <div className={styles.pillarGrid}>
              <div>
                <p className={styles.pillarLabel}>Learning Management System</p>
                <h3 className={styles.pillarHeadline}>Deliver Courses at Scale. No Tech Team Required.</h3>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <h4>Multi-Instructor Management</h4>
                    <p>
                      Add unlimited instructors with role-based access. Each instructor sees only their courses and students — no data mixing, no permission chaos.
                    </p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>White-Label Experience</h4>
                    <p>
                      Your brand everywhere — custom domain, branded portal, your logo on certificates. Students never see "Powered by Edveo" unless you want them to.
                    </p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>Batch & Cohort Management</h4>
                    <p>
                      Run live batches, recorded courses, or hybrid programs. Set enrollment limits, manage waitlists, and open new cohorts in minutes.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.pillarVisual}>
                <div className={styles.builderMock}>
                  {[
                    { icon: "👩‍🏫", label: "Priya Sharma — Physics · 3 batches", badge: "Active" },
                    { icon: "👨‍💻", label: "Rahul Nair — Coding Bootcamp · 2 batches", badge: "Active" },
                    { icon: "📹", label: "NEET Batch Jan 2026 — 184 enrolled", badge: "Live" },
                    { icon: "📊", label: "Platform analytics — all instructors", badge: "Admin" },
                  ].map((row) => (
                    <div key={row.label} className={styles.builderRow}>
                      <div className={styles.builderIcon}>{row.icon}</div>
                      <span className={styles.builderText}>{row.label}</span>
                      <span className={styles.builderBadge}>{row.badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Pillar 2 — CRM */}
          <article className={styles.pillarBlock}>
            <div className={`${styles.pillarGrid} ${styles.pillarGridRev}`}>
              <div>
                <p className={styles.pillarLabel}>CRM & Lead Pipeline</p>
                <h3 className={styles.pillarHeadline}>Turn Every Inquiry into a Student.</h3>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <h4>Omni-Channel Lead Capture</h4>
                    <p>
                      Every lead — from ads, website, WhatsApp, phone, or walk-in — automatically enters your pipeline. No manual entry. No dropped inquiries.
                    </p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>AI Lead Scoring</h4>
                    <p>
                      Edveo Intelligence scores every lead on intent signals and behavioral data. Your sales team calls the hottest leads first — conversion rates go up, effort goes down.
                    </p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>Enrollment Automation</h4>
                    <p>
                      Lead converted? Edveo creates the student profile, assigns the course, sends the welcome message, and generates the invoice — zero manual steps.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.pillarVisual}>
                <div className={styles.kanban}>
                  {[
                    { title: "New Leads", cards: ["NEET inquiry", "Coding demo"] },
                    { title: "Contacted", cards: ["Called — cb"] },
                    { title: "Enrolled", cards: ["Aanya K.", "Rohan M."] },
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
                  <strong>186</strong> new leads this week · <strong>63</strong> converted
                </p>
              </div>
            </div>
          </article>

          {/* Pillar 3 — Analytics */}
          <article className={styles.pillarBlock}>
            <div className={styles.pillarGrid}>
              <div>
                <p className={styles.pillarLabel}>Revenue Analytics</p>
                <h3 className={styles.pillarHeadline}>Know Your Numbers. Grow With Confidence.</h3>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <h4>Course-Level Revenue Breakdown</h4>
                    <p>
                      See exactly which course, batch, and instructor is driving revenue. Kill underperforming programs before they drain resources.
                    </p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>Cohort Retention Tracking</h4>
                    <p>
                      Track student completion rates by cohort, identify where students drop off, and fix the lesson that&apos;s killing your completion rate.
                    </p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>Lead Source Attribution</h4>
                    <p>
                      Know which ads, channels, and campaigns actually convert to paid students — not just clicks. Allocate your marketing budget where it actually works.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.pillarVisual}>
                <div className={styles.earningsMock}>
                  <div className={styles.earningsMockRow}>
                    <div className={styles.earningsTile}>
                      <div className={styles.earningsLbl}>Monthly Revenue</div>
                      <div className={styles.earningsNum}>₹8.4L</div>
                    </div>
                    <div className={`${styles.earningsTile} ${styles.earningsTileAccent}`}>
                      <div className={styles.earningsLbl}>New Enrollments</div>
                      <div className={styles.earningsNum}>186</div>
                    </div>
                  </div>
                  <div className={styles.earningsSub}>
                    ✓ Top course: NEET 2026 — ₹3.2L this month
                  </div>
                </div>
                <div className={styles.profileCard}>
                  <div className={styles.profileName}>Conversion by source</div>
                  <div className={styles.profileGrid}>
                    <div className={styles.profileStat}>
                      <div className={styles.profileStatLabel}>Google Ads</div>
                      <div className={`${styles.profileStatVal} ${styles.profileStatValGreen}`}>38%</div>
                    </div>
                    <div className={styles.profileStat}>
                      <div className={styles.profileStatLabel}>WhatsApp</div>
                      <div className={styles.profileStatVal}>29%</div>
                    </div>
                    <div className={styles.profileStat}>
                      <div className={styles.profileStatLabel}>Organic</div>
                      <div className={styles.profileStatVal}>24%</div>
                    </div>
                    <div className={styles.profileStat}>
                      <div className={styles.profileStatLabel}>Referral</div>
                      <div className={styles.profileStatVal}>9%</div>
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
          <h2 className={styles.sectionTitle}>Edveo Intelligence™ — Your Growth Engine.</h2>
          <p className={styles.sectionSub}>
            AI that sees your entire funnel — from lead generation to course completion — and acts on it automatically.
          </p>
          <div className={styles.aiGrid}>
            <div className={styles.aiCol}>
              <h3 className={styles.aiColTitle}>📈 Predicts</h3>
              <ul>
                <li>Which leads will convert this week</li>
                <li>Revenue forecast for next 30 days</li>
                <li>Courses likely to see drop-off</li>
              </ul>
            </div>
            <div className={styles.aiCol}>
              <h3 className={styles.aiColTitle}>📊 Detects</h3>
              <ul>
                <li>Students at risk before they quit</li>
                <li>Underperforming instructors by completion rate</li>
                <li>Content gaps causing failed quizzes</li>
              </ul>
            </div>
            <div className={styles.aiCol}>
              <h3 className={styles.aiColTitle}>⚡ Automates</h3>
              <ul>
                <li>Lead follow-up sequences and reminders</li>
                <li>Enrollment confirmations and onboarding</li>
                <li>Cohort-wide re-engagement campaigns</li>
              </ul>
            </div>
          </div>
          <p className={styles.competitor}>
            Classplus gives you a sales CRM. Edveo gives you an AI-powered revenue engine.
          </p>
        </div>
      </section>

      {/* ── Section 5: Go live ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Launch Your Academy in Under an Hour.</h2>
          <div className={styles.steps}>
            <div className={styles.stepCard}>
              <div className={styles.stepTime}>STEP 1 — 10 MINUTES</div>
              <p className={styles.stepBody}>Set up your white-label portal, add your domain, and onboard your first instructors</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepTime}>STEP 2 — 20 MINUTES</div>
              <p className={styles.stepBody}>Import your existing course catalog, set up CRM pipeline stages and lead sources</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepTime}>STEP 3 — DONE</div>
              <p className={styles.stepBody}>Go live — students enroll, instructors teach, leads convert, revenue tracked automatically</p>
            </div>
          </div>
          <p className={styles.stepNote}>
            <strong>Dedicated onboarding support included on all paid plans.</strong>
            <br />
            Our team migrates your existing data and configures your CRM pipeline with you — no extra charge.
          </p>
        </div>
      </section>

      {/* ── Section 6: Pricing ── */}
      <section id="pricing" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.pricingTeaser}>
            <p className={styles.pricingTeaserEyebrow}>PRICING</p>
            <h2 className={styles.pricingTeaserTitle}>Flat subscription. Unlimited students. No per-seat fee.</h2>
            <p className={styles.pricingTeaserSub}>
              No revenue cut. No per-student fees. One price that scales with you — not against you.
              <br />
              All plans include <strong>Edveo Intelligence™</strong> AI across every module.
            </p>
            <div className={styles.pricingTeaserActions}>
              <Link href="/pricing?segment=online" className={styles.pricingTeaserBtn}>
                See Full Pricing →
              </Link>
              <Link href="/register" className={styles.pricingTeaserGhost}>
                Start Free Trial
              </Link>
            </div>
            <p className={styles.pricingTeaserNote}>14-day free trial · No credit card · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* ── Section 7: Final CTA ── */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <h2 className={styles.finalTitle}>Your Edtech Deserves Infrastructure That Scales With You.</h2>
          <p className={styles.finalSub}>
            14-day free trial. Full access. No credit card required.
            <br />
            Book a live demo and we&apos;ll build your setup together.
          </p>
          <Link href="/register" className={styles.finalBtn}>
            Book a Demo →
          </Link>
          <p className={styles.finalTrust}>Zero commission · White-label ready · Data stored in India</p>
        </div>
      </section>
    </>
  );
}
