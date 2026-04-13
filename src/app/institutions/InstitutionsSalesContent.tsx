import Link from "next/link";
import styles from "./institutions.module.css";

function IconWhatsApp() {
  return (
    <svg className={styles.instChaosIcon} width="36" height="36" viewBox="0 0 24 24" fill="#25D366" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconExcel() {
  return (
    <svg className={styles.instChaosIcon} width="36" height="36" viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" fill="#217346" />
      <path d="M8 8h3v3H8V8zm5 0h3v3h-3V8zm-5 5h3v3H8v-3zm5 0h3v3h-3v-3zm-5 5h8v3H8v-3z" fill="#fff" opacity="0.9" />
    </svg>
  );
}

function IconForms() {
  return (
    <svg className={styles.instChaosIcon} width="36" height="36" viewBox="0 0 24 24" aria-hidden>
      <path fill="#7248B9" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" d="M14 2v6h6M8 13h8M8 17h8M8 9h4" />
    </svg>
  );
}

function IconPaper() {
  return (
    <svg className={styles.instChaosIcon} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

export default function InstitutionsSalesContent() {
  return (
    <>
      {/* Section 1 — Hero */}
      <section className={styles.instHero}>
        <div className={styles.instContainer}>
          <div className={styles.instHeroIntro}>
            <div className={styles.instBadge}>🏫 FOR OFFLINE INSTITUTIONS</div>
            <h1 className={styles.instHeroTitle}>Stop Running Your Institute on 4 Different Tools.</h1>
            <p className={styles.instHeroSub}>
              Edveo replaces your fee register, attendance sheet, WhatsApp leads, and course management — one platform, one subscription, live today.
            </p>
          </div>
          <div className={styles.instHeroVisualRow}>
            <div className={styles.instChaosPanel}>
              <div className={styles.instChaosItem}>
                <IconWhatsApp />
                <span className={styles.instChaosLabel}>WhatsApp</span>
              </div>
              <div className={styles.instChaosItem}>
                <IconExcel />
                <span className={styles.instChaosLabel}>Excel</span>
              </div>
              <div className={styles.instChaosItem}>
                <IconForms />
                <span className={styles.instChaosLabel}>Google Forms</span>
              </div>
              <div className={styles.instChaosItem}>
                <IconPaper />
                <span className={styles.instChaosLabel}>Paper register</span>
              </div>
            </div>
            <div className={styles.instUnifiedPanel}>
              <div className={styles.instUnifiedChrome}>
                <span className={styles.instUnifiedDot} style={{ background: "#FF5F57" }} />
                <span className={styles.instUnifiedDot} style={{ background: "#FFBD2E" }} />
                <span className={styles.instUnifiedDot} style={{ background: "#27C93F" }} />
                <span className={styles.instUnifiedUrl}>institute.edveo.com</span>
              </div>
              <div className={styles.instUnifiedBody}>
                <div className={styles.instUnifiedMod}>
                  <div className={styles.instUnifiedModTitle}>ERP</div>
                  <div className={styles.instUnifiedModLine}>
                    <div className={styles.instUnifiedModLineFill} style={{ width: "75%" }} />
                  </div>
                  <div className={styles.instUnifiedModLine}>
                    <div className={styles.instUnifiedModLineFill} style={{ width: "55%" }} />
                  </div>
                  <div className={styles.instUnifiedTag}>Fees · Attendance</div>
                </div>
                <div className={styles.instUnifiedMod}>
                  <div className={styles.instUnifiedModTitle}>CRM</div>
                  <div className={styles.instUnifiedModLine}>
                    <div className={styles.instUnifiedModLineFill} style={{ width: "65%" }} />
                  </div>
                  <div className={styles.instUnifiedModLine}>
                    <div className={styles.instUnifiedModLineFill} style={{ width: "40%" }} />
                  </div>
                  <div className={styles.instUnifiedTag}>Leads · Pipeline</div>
                </div>
                <div className={styles.instUnifiedMod}>
                  <div className={styles.instUnifiedModTitle}>LMS</div>
                  <div className={styles.instUnifiedModLine}>
                    <div className={styles.instUnifiedModLineFill} style={{ width: "80%" }} />
                  </div>
                  <div className={styles.instUnifiedModLine}>
                    <div className={styles.instUnifiedModLineFill} style={{ width: "50%" }} />
                  </div>
                  <div className={styles.instUnifiedTag}>Courses · Quizzes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Real cost */}
      <section className={`${styles.instSection} ${styles.instSectionAlt}`}>
        <div className={styles.instContainer}>
          <h2 className={styles.instSectionTitle}>What Your Institute Runs on Today</h2>
          <div className={styles.instTableWrap}>
            <table className={styles.instTable}>
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
          <p className={styles.instCallout}>
            <strong>The average institute loses ₹40,000–₹80,000/year in fee leakage alone</strong> from manual collection. Edveo fixes this on day one.
          </p>
        </div>
      </section>

      {/* Section 3 — Three pillars */}
      <section className={styles.instSection}>
        <div className={styles.instContainer}>
          <h2 className={styles.instMegaTitle}>One Platform. Three Engines. Zero Overlap.</h2>

          <article className={styles.instPillarBlock}>
            <div className={styles.instPillarGrid}>
              <div className={styles.instPillarCopy}>
                <p className={styles.instPillarLabel}>Enterprise Resource Planning</p>
                <h3 className={styles.instPillarHeadline}>Your Operations. Automated.</h3>
                <div className={styles.instFeatureList}>
                  <div className={styles.instFeatureItem}>
                    <h4>Fee Management</h4>
                    <p>
                      Collect fees online, generate GST invoices automatically, track pending payments, send automated reminders via WhatsApp and SMS — without chasing a single student manually.
                    </p>
                  </div>
                  <div className={styles.instFeatureItem}>
                    <h4>Attendance & Timetable</h4>
                    <p>
                      Digital attendance with one tap. Parents get notified instantly. Timetable scheduling with zero conflicts — teachers, rooms, and batches managed from one screen.
                    </p>
                  </div>
                  <div className={styles.instFeatureItem}>
                    <h4>Branch Management</h4>
                    <p>
                      Running multiple branches? See every branch&apos;s performance, fees, and attendance from one dashboard. No more calling each center for reports.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.instPillarVisual}>
                <div className={styles.instMockFee}>
                  <div className={styles.instMockFeeRow}>
                    <div className={styles.instMockFeeTile}>
                      <div className={styles.instMockFeeLbl}>Collected</div>
                      <div className={styles.instMockFeeNum}>₹4.2L</div>
                    </div>
                    <div className={`${styles.instMockFeeTile} ${styles.instMockFeeTileAccent}`}>
                      <div className={styles.instMockFeeLbl}>Pending</div>
                      <div className={styles.instMockFeeNum}>₹1.1L</div>
                    </div>
                  </div>
                  <div className={styles.instMockReminder}>Automated reminder sent to 23 students</div>
                </div>
              </div>
            </div>
          </article>

          <article className={styles.instPillarBlock}>
            <div className={`${styles.instPillarGrid} ${styles.instPillarGridRev}`}>
              <div className={styles.instPillarCopy}>
                <p className={styles.instPillarLabel}>Customer Relationship Management</p>
                <h3 className={styles.instPillarHeadline}>Never Lose a Lead Again.</h3>
                <div className={styles.instFeatureList}>
                  <div className={styles.instFeatureItem}>
                    <h4>Lead Pipeline</h4>
                    <p>
                      Every inquiry — walk-in, WhatsApp, phone call, website form — captured in one pipeline. Assign to staff, track follow-ups, see conversion rates by source.
                    </p>
                  </div>
                  <div className={styles.instFeatureItem}>
                    <h4>AI Lead Scoring</h4>
                    <p>
                      Edveo Intelligence automatically scores and prioritizes leads. Your staff knows exactly who to call first and when.
                    </p>
                  </div>
                  <div className={styles.instFeatureItem}>
                    <h4>Enrollment Automation</h4>
                    <p>
                      Lead converts → student profile created → fee structure assigned → WhatsApp welcome sent. Zero manual steps.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.instPillarVisual}>
                <div className={styles.instKanban}>
                  {[
                    { title: "New Inquiry", cards: ["NEET batch", "Weekend demo"] },
                    { title: "Follow-up", cards: ["Called — ring"] },
                    { title: "Demo Scheduled", cards: ["Sat 4pm"] },
                    { title: "Enrolled", cards: ["Aanya K."] },
                  ].map((col) => (
                    <div key={col.title} className={styles.instKanCol}>
                      <div className={styles.instKanColTitle}>{col.title}</div>
                      {col.cards.map((c) => (
                        <div key={c} className={styles.instKanCard}>
                          {c}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <p className={styles.instKanStats}>
                  <strong>42</strong> new inquiries this week · <strong>12</strong> converted
                </p>
              </div>
            </div>
          </article>

          <article className={styles.instPillarBlock}>
            <div className={styles.instPillarGrid}>
              <div className={styles.instPillarCopy}>
                <p className={styles.instPillarLabel}>Learning Management System</p>
                <h3 className={styles.instPillarHeadline}>Teach Online and Offline. Both.</h3>
                <div className={styles.instFeatureList}>
                  <div className={styles.instFeatureItem}>
                    <h4>Course Delivery</h4>
                    <p>
                      Upload recorded videos, PDFs, and notes. Students access everything from their portal — no WhatsApp file sharing, no Google Drive links.
                    </p>
                  </div>
                  <div className={styles.instFeatureItem}>
                    <h4>AI Quiz Builder</h4>
                    <p>
                      Generate a 50-question quiz from any chapter in 30 seconds. Auto-graded, performance tracked, results shared with parents instantly.
                    </p>
                  </div>
                  <div className={styles.instFeatureItem}>
                    <h4>Student Progress</h4>
                    <p>
                      See every student&apos;s attendance, assignment completion, quiz scores, and fee status in one unified profile. Identify at-risk students before they drop.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.instPillarVisual}>
                <div className={styles.instProfileCard}>
                  <div className={styles.instProfileName}>Student profile</div>
                  <div className={styles.instProfileGrid}>
                    <div className={styles.instProfileStat}>
                      <div className={styles.instProfileStatLabel}>Attendance</div>
                      <div className={`${styles.instProfileStatVal} ${styles.instProfileStatValGreen}`}>87%</div>
                    </div>
                    <div className={styles.instProfileStat}>
                      <div className={styles.instProfileStatLabel}>Fees</div>
                      <div className={styles.instProfileStatVal}>Paid</div>
                    </div>
                    <div className={styles.instProfileStat}>
                      <div className={styles.instProfileStatLabel}>Last quiz</div>
                      <div className={styles.instProfileStatVal}>73%</div>
                    </div>
                    <div className={styles.instProfileStat}>
                      <div className={styles.instProfileStatLabel}>Courses</div>
                      <div className={styles.instProfileStatVal}>3 enrolled</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Section 4 — AI */}
      <section className={`${styles.instSection} ${styles.instSectionAlt}`}>
        <div className={styles.instContainer}>
          <h2 className={styles.instSectionTitle}>The Only Platform Where AI Sees Your Entire Institute.</h2>
          <p className={styles.instAiSub}>
            Not just your sales funnel. Edveo Intelligence connects fees, attendance, leads, and course performance into one institutional brain.
          </p>
          <div className={styles.instAiGrid}>
            <div className={styles.instAiCol}>
              <h3 className={styles.instAiColTitle}>🎓 Predicts</h3>
              <ul>
                <li>Fee defaults 7 days before due</li>
                <li>Enrollment conversion rate by source</li>
                <li>Peak inquiry seasons</li>
              </ul>
            </div>
            <div className={styles.instAiCol}>
              <h3 className={styles.instAiColTitle}>📊 Detects</h3>
              <ul>
                <li>Students at risk of dropping</li>
                <li>Attendance anomalies</li>
                <li>Content gaps in courses</li>
              </ul>
            </div>
            <div className={styles.instAiCol}>
              <h3 className={styles.instAiColTitle}>⚡ Automates</h3>
              <ul>
                <li>Follow-up sequences for leads</li>
                <li>Fee reminder messages</li>
                <li>Quiz generation from syllabus</li>
              </ul>
            </div>
          </div>
          <p className={styles.instCompetitor}>Classplus AI manages your sales funnel. Edveo Intelligence runs your entire institute.</p>
        </div>
      </section>

      {/* Section 5 — Go live */}
      <section className={styles.instSection}>
        <div className={styles.instContainer}>
          <h2 className={styles.instSectionTitle}>You&apos;re Live Before You Leave This Meeting.</h2>
          <div className={styles.instSteps}>
            <div className={styles.instStepCard}>
              <div className={styles.instStepTime}>STEP 1 — 2 MINUTES</div>
              <p className={styles.instStepBody}>Sign up with your institute details</p>
            </div>
            <div className={styles.instStepCard}>
              <div className={styles.instStepTime}>STEP 2 — 5 MINUTES</div>
              <p className={styles.instStepBody}>Add your courses, batches & fee structure</p>
            </div>
            <div className={styles.instStepCard}>
              <div className={styles.instStepTime}>STEP 3 — DONE</div>
              <p className={styles.instStepBody}>Students enroll, fees collected, leads tracked</p>
            </div>
          </div>
          <p className={styles.instStepNote}>
            <strong>No implementation partner. No IT team. No 6-week onboarding.</strong>
            <br />
            Our team sets up your account with you — right now.
          </p>
        </div>
      </section>

      {/* Section 6 — Pricing */}
      <section className={`${styles.instSection} ${styles.instSectionAlt}`}>
        <div className={styles.instContainer}>
          <h2 className={styles.instSectionTitle}>Simple Pricing. No Hidden Fees.</h2>
          <p className={styles.instPricingSub}>No setup fee. No implementation charge. Cancel anytime.</p>
          <div className={styles.instPriceGrid}>
            <div className={styles.instPriceCard}>
              <div className={styles.instPriceTier}>Starter</div>
              <div className={styles.instPriceAmount}>₹3,499/mo</div>
              <ul>
                <li>Up to 200 students</li>
                <li>LMS + ERP + CRM</li>
                <li>Fee collection + attendance</li>
                <li>Digital timetable</li>
              </ul>
              <Link href="/register" className={styles.instPriceBtn}>
                Start Free Trial
              </Link>
            </div>
            <div className={`${styles.instPriceCard} ${styles.instPriceCardFeatured}`}>
              <div className={styles.instPriceTier}>Professional</div>
              <div className={styles.instPriceAmount}>₹6,999/mo</div>
              <ul>
                <li>Up to 1,000 students</li>
                <li>Everything in Starter</li>
                <li>WhatsApp CRM + AI scoring</li>
              </ul>
              <Link href="/register" className={styles.instPriceBtn}>
                Start Free Trial
              </Link>
            </div>
            <div className={styles.instPriceCard}>
              <div className={styles.instPriceTier}>Business</div>
              <div className={styles.instPriceAmount}>₹12,999/mo</div>
              <ul>
                <li>Unlimited students</li>
                <li>Everything in Pro</li>
                <li>Multi-branch + dedicated AM</li>
                <li>Branded white-label app</li>
                <li>Priority support SLA</li>
              </ul>
              <button type="button" className={`${styles.instPriceBtn} ${styles.instPriceBtnOutline}`}>
                Contact Sales
              </button>
            </div>
          </div>
          <p className={styles.instPriceReassure}>
            All plans include <strong>Edveo Intelligence</strong> — AI across every module. No add-ons.
          </p>
        </div>
      </section>

      {/* Section 7 — Final CTA */}
      <section className={styles.instFinalCta}>
        <div className={styles.instContainer}>
          <h2 className={styles.instFinalTitle}>Start Your Free Trial Right Now.</h2>
          <p className={styles.instFinalSub}>
            14 days. Full access. No credit card.
            <br />
            We&apos;ll set up your institute profile together — it takes 7 minutes.
          </p>
          <Link href="/register" className={styles.instFinalBtn}>
            Start Free Trial →
          </Link>
          <p className={styles.instFinalWa}>Questions? Our team is here. Chat on WhatsApp</p>
          <p className={styles.instFinalTrust}>98.9% uptime SLA · Local Kerala support · Data security certified</p>
        </div>
      </section>
    </>
  );
}
