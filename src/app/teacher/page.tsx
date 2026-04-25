import Link from "next/link";
import EdveoLogo from "../components/EdveoLogo";
import SiteFooter from "../components/SiteFooter";
import navStyles from "../components/siteNavbar.module.css";
import styles from "./audience.module.css";

function TeacherNav() {
  return (
    <div className={navStyles.stickyWrapper}>
      <nav className={navStyles.navbar}>
        <Link href="/" className={navStyles.navBrand}>
          <EdveoLogo variant="nav" />
        </Link>
        <div className={navStyles.navLinks}>
          <Link href="/teacher#features">Features</Link>
          <Link href="/teacher#pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className={navStyles.navActions}>
          <Link href="/login" className={navStyles.btnLogin}>Login</Link>
          <Link href="/register" className={navStyles.btnTrial}>Start Free</Link>
        </div>
      </nav>
    </div>
  );
}

export default function TeacherPage() {
  return (
    <main className={styles.salesMain}>
      <TeacherNav />
      <TeacherContent />
      <SiteFooter />
    </main>
  );
}

function TeacherContent() {
  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroIntro}>
            <div className={styles.badge}>👩‍🏫 FOR INDIVIDUAL TEACHERS</div>
            <h1 className={styles.heroTitle}>
              Teach on Your Terms.
              <br />
              <span className={styles.accent}>Keep 100% of What You Earn.</span>
            </h1>
            <p className={styles.heroSub}>
              Build your course once, sell it forever. Edveo gives every teacher a branded academy — with AI course creation, payment collection, and student management — starting today.
            </p>
          </div>
          <div className={styles.heroVisualRow}>
            <div className={styles.statPanel}>
              <div className={styles.statPanelChrome}>
                <span className={styles.statDot} style={{ background: "#FF5F57" }} />
                <span className={styles.statDot} style={{ background: "#FFBD2E" }} />
                <span className={styles.statDot} style={{ background: "#27C93F" }} />
                <span className={styles.statPanelUrl}>yourname.edveo.com</span>
              </div>
              <div className={styles.statRow}>
                <div className={styles.statCard}>
                  <div className={styles.statLabel}>This Month</div>
                  <div className={styles.statValue}>₹58,400</div>
                  <div className={styles.statSub}>+34% vs last month</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statLabel}>Students</div>
                  <div className={styles.statValue}>214</div>
                  <div className={styles.statSub}>12 enrolled today</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Platform Commission</div>
                <div className={styles.statValue}>0%</div>
                <div className={styles.statSub}>You keep everything. Always.</div>
              </div>
            </div>

            <div className={styles.checkPanel}>
              {[
                "Branded course portal — your domain, your identity",
                "AI generates your entire course outline in 30 seconds",
                "Collect payments via Razorpay — no manual UPI chasing",
                "Student progress tracking with zero spreadsheets",
                "Auto-issue certificates when students complete courses",
                "Mobile-first — students watch on any device",
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
          <h2 className={styles.sectionTitle}>What Every Teacher Deals With Today</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>What You&apos;re Doing Now</th>
                  <th>The Problem It Creates</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Selling on Udemy / Unacademy</td>
                  <td>30–70% commission cut, no brand, no student data</td>
                </tr>
                <tr>
                  <td>Managing payments via UPI / GPay</td>
                  <td>No invoices, no tracking, manual follow-up for refunds</td>
                </tr>
                <tr>
                  <td>Sharing content via WhatsApp groups</td>
                  <td>No progress tracking, files get forwarded, no control</td>
                </tr>
                <tr>
                  <td>Creating content manually for every batch</td>
                  <td>Hours spent on slides and quizzes you could generate in 30 seconds</td>
                </tr>
                <tr>
                  <td>Tracking student progress in Excel</td>
                  <td>Manual updates, no alerts, students fall behind silently</td>
                </tr>
                <tr>
                  <td>Certificates done in Canva / email PDFs</td>
                  <td>Not verifiable, looks unprofessional, manual every time</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.callout}>
            <strong>Teachers lose ₹30,000–₹2L/year in unnecessary commissions</strong> by building someone else&apos;s brand instead of their own.
          </p>
        </div>
      </section>

      {/* ── Section 3: Three feature pillars ── */}
      <section id="features" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.megaTitle}>Everything You Need to Run a Professional Teaching Business.</h2>

          {/* Pillar 1 — Course & Content */}
          <article className={styles.pillarBlock}>
            <div className={styles.pillarGrid}>
              <div>
                <p className={styles.pillarLabel}>Course Creation</p>
                <h3 className={styles.pillarHeadline}>Build Courses in Hours, Not Weeks.</h3>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <h4>AI Course Builder</h4>
                    <p>
                      Type your topic and Edveo Intelligence drafts your full curriculum — modules, lessons, quizzes, and assessments — in under a minute. You refine and publish.
                    </p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>Video + PDF Delivery</h4>
                    <p>
                      Upload recorded videos, PDFs, and reading materials. Students access everything in a clean, distraction-free portal — not a WhatsApp group.
                    </p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>Auto-Generated Quizzes</h4>
                    <p>
                      Generate a 20-question MCQ quiz from any lesson in 30 seconds. Auto-graded and scored — no manual checking.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.pillarVisual}>
                <div className={styles.builderMock}>
                  {[
                    { icon: "📹", label: "Module 1 — Introduction to Physics", badge: "Published" },
                    { icon: "📄", label: "Module 2 — Laws of Motion", badge: "Published" },
                    { icon: "🤖", label: "AI Quiz — 20 questions auto-generated", badge: "Live" },
                    { icon: "📊", label: "Assignment — Problem Set A", badge: "Draft" },
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

          {/* Pillar 2 — Payments & Revenue */}
          <article className={styles.pillarBlock}>
            <div className={`${styles.pillarGrid} ${styles.pillarGridRev}`}>
              <div>
                <p className={styles.pillarLabel}>Payments & Revenue</p>
                <h3 className={styles.pillarHeadline}>Get Paid. Keep Every Rupee.</h3>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <h4>Zero Commission</h4>
                    <p>
                      Every payment goes directly to your Razorpay account. Edveo charges a flat monthly subscription — not a percentage of your revenue.
                    </p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>Automated Invoicing</h4>
                    <p>
                      GST-compliant invoices generated and sent automatically on every payment. No manual billing, no follow-up emails.
                    </p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>Flexible Pricing</h4>
                    <p>
                      Sell one-time courses, monthly subscriptions, or batch cohorts. Set installment plans for premium programs.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.pillarVisual}>
                <div className={styles.earningsMock}>
                  <div className={styles.earningsMockRow}>
                    <div className={styles.earningsTile}>
                      <div className={styles.earningsLbl}>This Month</div>
                      <div className={styles.earningsNum}>₹58,400</div>
                    </div>
                    <div className={`${styles.earningsTile} ${styles.earningsTileAccent}`}>
                      <div className={styles.earningsLbl}>Commission Paid</div>
                      <div className={styles.earningsNum}>₹0</div>
                    </div>
                  </div>
                  <div className={styles.earningsSub}>
                    ✓ Payout to your account — next business day
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Pillar 3 — Students & Certificates */}
          <article className={styles.pillarBlock}>
            <div className={styles.pillarGrid}>
              <div>
                <p className={styles.pillarLabel}>Student Management</p>
                <h3 className={styles.pillarHeadline}>Know Every Student. Lose None.</h3>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <h4>Progress Tracking</h4>
                    <p>
                      See exactly which lessons each student has watched, which quizzes they&apos;ve passed, and where they&apos;re stuck — no spreadsheet needed.
                    </p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>Auto-Issued Certificates</h4>
                    <p>
                      When a student completes your course, Edveo automatically issues a verifiable digital certificate with your branding — shareable on LinkedIn.
                    </p>
                  </div>
                  <div className={styles.featureItem}>
                    <h4>Re-Engagement Nudges</h4>
                    <p>
                      Edveo Intelligence detects students who haven&apos;t logged in for 7 days and sends a personalized nudge on your behalf — reducing drop-off silently.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.pillarVisual}>
                <div className={styles.profileCard}>
                  <div className={styles.profileName}>Student overview</div>
                  <div className={styles.profileGrid}>
                    <div className={styles.profileStat}>
                      <div className={styles.profileStatLabel}>Completion</div>
                      <div className={`${styles.profileStatVal} ${styles.profileStatValGreen}`}>73%</div>
                    </div>
                    <div className={styles.profileStat}>
                      <div className={styles.profileStatLabel}>Quiz Score</div>
                      <div className={styles.profileStatVal}>84%</div>
                    </div>
                    <div className={styles.profileStat}>
                      <div className={styles.profileStatLabel}>Fees</div>
                      <div className={styles.profileStatVal}>Paid</div>
                    </div>
                    <div className={styles.profileStat}>
                      <div className={styles.profileStatLabel}>Certificate</div>
                      <div className={styles.profileStatVal}>Auto</div>
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
          <h2 className={styles.sectionTitle}>Edveo Intelligence™ — Your AI Co-Teacher.</h2>
          <p className={styles.sectionSub}>
            Not a chatbot. Not a prompt tool. Edveo Intelligence is baked into every part of your teaching workflow.
          </p>
          <div className={styles.aiGrid}>
            <div className={styles.aiCol}>
              <h3 className={styles.aiColTitle}>🎓 Creates</h3>
              <ul>
                <li>Full course outlines from a topic</li>
                <li>MCQ quizzes from any lesson</li>
                <li>Assignment rubrics automatically</li>
              </ul>
            </div>
            <div className={styles.aiCol}>
              <h3 className={styles.aiColTitle}>📊 Monitors</h3>
              <ul>
                <li>Students at risk of dropping out</li>
                <li>Lessons with lowest engagement</li>
                <li>Quiz difficulty vs. pass rate</li>
              </ul>
            </div>
            <div className={styles.aiCol}>
              <h3 className={styles.aiColTitle}>⚡ Automates</h3>
              <ul>
                <li>Re-engagement messages to inactive students</li>
                <li>Certificate issuance on completion</li>
                <li>Payment reminders for installment plans</li>
              </ul>
            </div>
          </div>
          <p className={styles.competitor}>
            Udemy gives you a marketplace. Edveo gives you a business.
          </p>
        </div>
      </section>

      {/* ── Section 5: Go live ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Your Academy is Live in 5 Minutes.</h2>
          <div className={styles.steps}>
            <div className={styles.stepCard}>
              <div className={styles.stepTime}>STEP 1 — 2 MINUTES</div>
              <p className={styles.stepBody}>Sign up and set up your branded portal — pick your subdomain</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepTime}>STEP 2 — 3 MINUTES</div>
              <p className={styles.stepBody}>Upload your first course or use AI to build one from scratch</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepTime}>STEP 3 — DONE</div>
              <p className={styles.stepBody}>Share your enrollment link — students pay and start learning</p>
            </div>
          </div>
          <p className={styles.stepNote}>
            <strong>No tech skills needed. No developer. No domain setup required.</strong>
            <br />
            We handle the infrastructure so you focus on teaching.
          </p>
        </div>
      </section>

      {/* ── Section 6: Pricing ── */}
      <section id="pricing" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Simple Pricing for Teachers.</h2>
          <p className={styles.pricingSub}>No revenue cut. No hidden fees. Cancel anytime.</p>
          <div className={styles.priceGrid}>
            <div className={styles.priceCard}>
              <div className={styles.priceTier}>Creator</div>
              <div className={styles.priceAmount}>₹799/mo</div>
              <ul>
                <li>Up to 50 students</li>
                <li>Unlimited courses</li>
                <li>Razorpay payment collection</li>
                <li>AI quiz generator</li>
                <li>Digital certificates</li>
              </ul>
              <Link href="/register" className={styles.priceBtn}>
                Start Free Trial
              </Link>
            </div>
            <div className={`${styles.priceCard} ${styles.priceCardFeatured}`}>
              <div className={styles.priceTier}>Educator</div>
              <div className={styles.priceAmount}>₹1,999/mo</div>
              <ul>
                <li>Up to 500 students</li>
                <li>Everything in Creator</li>
                <li>AI course builder</li>
                <li>Custom domain</li>
                <li>Advanced analytics</li>
                <li>Priority support</li>
              </ul>
              <Link href="/register" className={styles.priceBtn}>
                Start Free Trial
              </Link>
            </div>
            <div className={styles.priceCard}>
              <div className={styles.priceTier}>Academy</div>
              <div className={styles.priceAmount}>₹3,999/mo</div>
              <ul>
                <li>Unlimited students</li>
                <li>Everything in Educator</li>
                <li>Multiple instructors</li>
                <li>White-label branding</li>
                <li>Dedicated account manager</li>
              </ul>
              <Link href="/register" className={styles.priceBtn}>
                Start Free Trial
              </Link>
            </div>
          </div>
          <p className={styles.priceReassure}>
            All plans include <strong>Edveo Intelligence™</strong> AI features. No add-ons, no extra charges.
          </p>
        </div>
      </section>

      {/* ── Section 7: Final CTA ── */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <h2 className={styles.finalTitle}>Stop Building Someone Else&apos;s Platform. Build Yours.</h2>
          <p className={styles.finalSub}>
            14-day free trial. Full access. No credit card required.
            <br />
            Your branded academy is live before you finish your coffee.
          </p>
          <Link href="/register" className={styles.finalBtn}>
            Start Your Free Trial →
          </Link>
          <p className={styles.finalTrust}>Zero commission · Data stored in India · Cancel anytime</p>
        </div>
      </section>
    </>
  );
}
