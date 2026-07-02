import styles from "./page.module.css";
import heroStyles from "./components/hero.module.css";
import Link from "next/link";
import { TeacherIcon, EdtechIcon, InstitutionIcon } from "./components/HeroSection";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CtaBanner from "./components/CtaBanner";
import HeroSection from "./components/HeroSection";
import AgentShowcase from "./components/AgentShowcase";
import FeatureExplorer from "./components/FeatureExplorer";
import MobileAppBanner from "./components/MobileAppBanner";
import { COMPANY_WHATSAPP_URL, COMPANY_WHATSAPP_CTA_URL } from "@/lib/companyPublicInfo";

export default function Home() {
  return (
    <main className={styles.main}>
      <SiteNavbar activePage="home" />

      {/* Hero */}
      <HeroSection />

      {/* Trust bar — honest early-stage signals, no fake logos */}
      <div className={styles.trustStrip}>
        <div className={styles.trustStripInner}>
          <div className={styles.trustStripItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Data stays in your region</span>
          </div>
          <span className={styles.trustStripDot} aria-hidden />
          <div className={styles.trustStripItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M7 10h4M7 14h10" strokeLinecap="round"/></svg>
            <span>Payments via Razorpay</span>
          </div>
          <span className={styles.trustStripDot} aria-hidden />
          <div className={styles.trustStripItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
            <span>Free forever, no card needed</span>
          </div>
          <span className={styles.trustStripDot} aria-hidden />
          <div className={styles.trustStripItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            <span>Go live in under 1 minute</span>
          </div>
          <span className={styles.trustStripDot} aria-hidden />
          <div className={styles.trustStripItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="7" width="11" height="10" rx="1.5"/><rect x="11" y="5" width="11" height="10" rx="1.5"/></svg>
            <span>Multiple payment gateways</span>
          </div>
        </div>
      </div>

      {/* How it works — three-agent animated showcase */}
      <AgentShowcase />



      <div dangerouslySetInnerHTML={{ __html: `<!-- GO ONLINE SECTION START -->
<style>
  @media (max-width: 992px) {
    .gov2-pad { padding: 0 16px !important; }
    .gov2-title { font-size: 26px !important; line-height: 1.3 !important; }
    .gov2-compare { grid-template-columns: 1fr !important; }
    .gov2-arrow { display: none !important; }
    .gov2-stack { grid-template-columns: 1fr !important; }
    .gov2-stack-right { justify-content: flex-start !important; }
    .gov2-cards { grid-template-columns: 1fr !important; }
    .gov2-domain { grid-template-columns: 1fr !important; text-align: center !important; }
    .gov2-domain-right { align-items: center !important; }
    .go-online-card-pad { padding: 24px 16px !important; }
  }
</style>
<section style="background:#fff;padding:64px 0 0;">
<div class="gov2-pad" style="max-width:1200px;margin:0 auto;padding:0 40px;">

  <div style="text-align:center;margin-bottom:48px;max-width:760px;margin-left:auto;margin-right:auto;">
    <p style="font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#155EEF;margin:0 0 12px;">TAKE YOUR INSTITUTE ONLINE</p>
    <h2 class="gov2-title" style="font-size:34px;font-weight:800;letter-spacing:-0.02em;color:#0A2540;line-height:1.2;margin:0 0 14px;max-width:720px;margin-left:auto;margin-right:auto;">Your institute deserves better than WhatsApp groups and Google Drive links.</h2>
    <p style="font-size:16px;color:#54607A;line-height:1.6;margin:0;">Give your students a proper learning environment — video lessons, live classes, exams, and progress tracking — all under your institute's own name and brand.</p>
  </div>

  <!-- Comparison: muted past → sharp Ink-Navy future -->
  <div class="gov2-compare" style="position:relative;display:grid;grid-template-columns:1fr 1fr;border-radius:18px;overflow:hidden;border:1px solid #DCE4F5;box-shadow:0 18px 40px -24px rgba(10,37,64,0.22);margin-bottom:24px;">

    <!-- Past (faded, grey) -->
    <div style="background:#F5F6F8;padding:32px 30px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#9CA3AF;margin-bottom:20px;">How most institutes do it today</div>
      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:18px;">
        <span style="width:22px;height:22px;border-radius:50%;background:#E5E7EB;color:#9CA3AF;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;margin-top:1px;">✕</span>
        <div><div style="font-size:14px;color:#6B7280;line-height:1.45;">Classes on YouTube, links dropped in WhatsApp</div><div style="font-size:12px;color:#9CA3AF;margin-top:2px;">Anyone with the link can watch. No control, no tracking.</div></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:18px;">
        <span style="width:22px;height:22px;border-radius:50%;background:#E5E7EB;color:#9CA3AF;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;margin-top:1px;">✕</span>
        <div><div style="font-size:14px;color:#6B7280;line-height:1.45;">Notes dumped in Google Drive folders</div><div style="font-size:12px;color:#9CA3AF;margin-top:2px;">Folders get messy. Students can't find anything.</div></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:18px;">
        <span style="width:22px;height:22px;border-radius:50%;background:#E5E7EB;color:#9CA3AF;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;margin-top:1px;">✕</span>
        <div><div style="font-size:14px;color:#6B7280;line-height:1.45;">Exam papers on WhatsApp, answers back as photos</div><div style="font-size:12px;color:#9CA3AF;margin-top:2px;">Marking takes days. Results compiled by hand.</div></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="width:22px;height:22px;border-radius:50%;background:#E5E7EB;color:#9CA3AF;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;margin-top:1px;">✕</span>
        <div><div style="font-size:14px;color:#6B7280;line-height:1.45;">No idea who's struggling until results arrive</div><div style="font-size:12px;color:#9CA3AF;margin-top:2px;">You find out when it's already too late.</div></div>
      </div>
    </div>

    <!-- Future (crisp, navy/white) -->
    <div style="background:#fff;padding:32px 30px;box-shadow:-24px 0 48px -28px rgba(10,37,64,0.18);">
      <div style="height:3px;background:linear-gradient(90deg,#2E90FA,#155EEF);margin:-32px -30px 22px;"></div>
      <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#155EEF;margin-bottom:20px;">With Edveo — your own platform</div>
      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:18px;">
        <span style="width:22px;height:22px;border-radius:50%;background:#EAF1FE;color:#155EEF;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;margin-top:1px;">✓</span>
        <div><div style="font-size:14px;color:#0A2540;font-weight:600;line-height:1.45;">Recorded lessons inside your own branded app</div><div style="font-size:12px;color:#54607A;margin-top:2px;">Private. Organised by subject &amp; topic. Fully trackable.</div></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:18px;">
        <span style="width:22px;height:22px;border-radius:50%;background:#EAF1FE;color:#155EEF;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;margin-top:1px;">✓</span>
        <div><div style="font-size:14px;color:#0A2540;font-weight:600;line-height:1.45;">Live classes in Edveo — attendance auto-marked</div><div style="font-size:12px;color:#54607A;margin-top:2px;">No Zoom links on WhatsApp. Students join from the app.</div></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:18px;">
        <span style="width:22px;height:22px;border-radius:50%;background:#EAF1FE;color:#155EEF;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;margin-top:1px;">✓</span>
        <div><div style="font-size:14px;color:#0A2540;font-weight:600;line-height:1.45;">Online exams — auto-scored, results instant</div><div style="font-size:12px;color:#54607A;margin-top:2px;">Students take it. Edveo marks it. You see the results.</div></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="width:22px;height:22px;border-radius:50%;background:#EAF1FE;color:#155EEF;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;margin-top:1px;">✓</span>
        <div><div style="font-size:14px;color:#0A2540;font-weight:600;line-height:1.45;">See who's weak in which topic — before exams</div><div style="font-size:12px;color:#54607A;margin-top:2px;">Topic-level mastery for every student.</div></div>
      </div>
    </div>

    <!-- Seam arrow badge -->
    <div class="gov2-arrow" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:46px;height:46px;border-radius:50%;background:#0A2540;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 20px rgba(10,37,64,0.30);z-index:2;">
      <span style="color:#fff;font-size:19px;line-height:1;">→</span>
    </div>

  </div>

  <!-- Replaces your whole stack → one branded app -->
  <div class="gov2-stack" style="display:grid;grid-template-columns:1fr auto;gap:32px;align-items:center;background:linear-gradient(160deg,#F6F9FF,#E9F1FE);border:1px solid #DCE4F5;border-radius:18px;padding:26px 30px;margin-bottom:56px;">
    <div>
      <div style="font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#155EEF;margin-bottom:12px;">One login replaces your whole stack</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <span style="display:inline-flex;align-items:center;background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:6px 12px;font-size:13px;color:#9CA3AF;text-decoration:line-through;">WhatsApp groups</span>
        <span style="display:inline-flex;align-items:center;background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:6px 12px;font-size:13px;color:#9CA3AF;text-decoration:line-through;">Google Drive</span>
        <span style="display:inline-flex;align-items:center;background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:6px 12px;font-size:13px;color:#9CA3AF;text-decoration:line-through;">YouTube links</span>
        <span style="display:inline-flex;align-items:center;background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:6px 12px;font-size:13px;color:#9CA3AF;text-decoration:line-through;">Zoom</span>
        <span style="display:inline-flex;align-items:center;background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:6px 12px;font-size:13px;color:#9CA3AF;text-decoration:line-through;">Excel sheets</span>
        <span style="display:inline-flex;align-items:center;background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:6px 12px;font-size:13px;color:#9CA3AF;text-decoration:line-through;">Paper register</span>
      </div>
    </div>
    <div class="gov2-stack-right" style="display:flex;align-items:center;gap:18px;justify-content:flex-end;">
      <span style="font-size:24px;color:#155EEF;line-height:1;flex-shrink:0;">→</span>
      <div style="width:210px;flex-shrink:0;background:#fff;border:1px solid #DCE4F5;border-radius:14px;overflow:hidden;box-shadow:0 16px 34px -14px rgba(10,37,64,0.28);">
        <div style="background:#0A2540;padding:10px 12px;display:flex;align-items:center;gap:8px;">
          <div style="width:20px;height:20px;border-radius:6px;background:#2E90FA;flex-shrink:0;"></div>
          <div style="font-size:11px;font-weight:700;color:#fff;">Bright Future Academy</div>
        </div>
        <div style="padding:11px 12px;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:8px;font-size:11px;color:#0A2540;font-weight:500;"><span style="width:6px;height:6px;border-radius:50%;background:#E24B4A;flex-shrink:0;"></span>Live now · Organic Chemistry</div>
          <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:#54607A;"><span>Term fees</span><span style="color:#0F9D58;font-weight:700;">Paid ✓</span></div>
          <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:#54607A;"><span>Physics mastery</span><span style="color:#155EEF;font-weight:700;">74%</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="gov2-cards" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:56px;max-width:100%;">
    <div style="border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;background:#fff;">
      <div style="width:48px;height:48px;background:#EAF1FE;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155EEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg></div>
      <div style="font-size:16px;font-weight:700;color:#0A2540;margin-bottom:5px;">Recorded Video Lessons</div>
      <div style="font-size:14px;color:#6B7280;line-height:1.6;margin-bottom:8px;">Upload and organise lessons by subject, chapter, and topic. Students watch on demand from their portal or mobile app.</div>
      <div style="font-size:13px;color:#DC2626;font-weight:500;">Replaces: YouTube + Google Drive links on WhatsApp</div>
    </div>
    <div style="border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;background:#fff;">
      <div style="width:48px;height:48px;background:#EAF1FE;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155EEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg></div>
      <div style="font-size:16px;font-weight:700;color:#0A2540;margin-bottom:5px;">Live Classes</div>
      <div style="font-size:14px;color:#6B7280;line-height:1.6;margin-bottom:8px;">Host live sessions directly inside Edveo. Attendance is marked automatically when students join.</div>
      <div style="font-size:13px;color:#DC2626;font-weight:500;">Replaces: Zoom links shared on WhatsApp groups</div>
    </div>
    <div style="border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;background:#fff;">
      <div style="width:48px;height:48px;background:#EAF1FE;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155EEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
      <div style="font-size:16px;font-weight:700;color:#0A2540;margin-bottom:5px;">Online Exams & Quizzes</div>
      <div style="font-size:14px;color:#6B7280;line-height:1.6;margin-bottom:8px;">Create tests, assign to batches, auto-score answers. Results available instantly — no manual marking.</div>
      <div style="font-size:13px;color:#DC2626;font-weight:500;">Replaces: WhatsApp paper photos, manual marking</div>
    </div>
    <div style="border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;background:#fff;">
      <div style="width:48px;height:48px;background:#EAF1FE;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155EEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>
      <div style="font-size:16px;font-weight:700;color:#0A2540;margin-bottom:5px;">Assignments</div>
      <div style="font-size:14px;color:#6B7280;line-height:1.6;margin-bottom:8px;">Assign homework digitally. Students submit inside the app. You review, grade, and give feedback — all in one place.</div>
      <div style="font-size:13px;color:#DC2626;font-weight:500;">Replaces: PDF assignments on WhatsApp</div>
    </div>
    <div style="border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;background:#fff;">
      <div style="width:48px;height:48px;background:#EAF1FE;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155EEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></div>
      <div style="font-size:16px;font-weight:700;color:#0A2540;margin-bottom:5px;">Branded Student App</div>
      <div style="font-size:14px;color:#6B7280;line-height:1.6;margin-bottom:8px;">Your students download an app with your institute's name and logo. Not Edveo's name — yours.</div>
      <div style="font-size:13px;color:#DC2626;font-weight:500;">Replaces: Generic WhatsApp groups</div>
    </div>
    <div style="border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;background:#fff;">
      <div style="width:48px;height:48px;background:#EAF1FE;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155EEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
      <div style="font-size:16px;font-weight:700;color:#0A2540;margin-bottom:5px;">Your Own Website</div>
      <div style="font-size:14px;color:#6B7280;line-height:1.6;margin-bottom:8px;">Get a professional website at your own domain. Take admissions online. Be found on Google.</div>
      <div style="font-size:13px;color:#DC2626;font-weight:500;">Replaces: No online presence at all</div>
    </div>
  </div>

  <div class="gov2-domain" style="background:#F6F9FF;border:1px solid #DCE4F5;border-radius:18px;padding:30px 36px;max-width:100%;margin:0 0 8px;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;">
    <div>
      <div style="font-size:20px;font-weight:700;color:#0A2540;margin-bottom:5px;">Your institute. Your brand. Your domain.</div>
      <div style="font-size:15px;color:#6B7280;line-height:1.6;">Students access everything through your own branded portal and mobile app — not a generic Edveo link. You look like a professional institute from day one.</div>
    </div>
    <div class="gov2-domain-right" style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;">
      <div style="background:#fff;border:1px solid #E5E7EB;border-radius:6px;padding:8px 16px;font-size:14px;color:#374151;font-family:monospace;white-space:nowrap;">🌐 <span style="color:#155EEF;font-weight:600;">yourinstitute.com</span></div>
      <div style="background:#fff;border:1px solid #E5E7EB;border-radius:6px;padding:8px 16px;font-size:14px;color:#374151;font-family:monospace;white-space:nowrap;">🌐 <span style="color:#155EEF;font-weight:600;">yourinstitute</span>.edveo.co</div>
      <div style="font-size:12px;color:#9CA3AF;text-align:right;">Both options available</div>
    </div>
  </div>

</div>
</section>
<!-- GO ONLINE SECTION END -->` }} />




      {/* Feature Explorer — tabbed, equal real estate for all 5 features */}
      <FeatureExplorer />

      <div dangerouslySetInnerHTML={{ __html: `<!-- EDVEO AI FEATURE SECTION START -->
<section style="background:#F9FAFB;padding:56px 0;border-top:1px solid #E5E7EB;">
  <div style="max-width:1200px;margin:0 auto;padding:0 40px;">

    <div style="text-align:center;margin-bottom:40px;">
      <div style="display:inline-flex;align-items:center;gap:6px;background:#fff;border:1px solid #E5E7EB;border-radius:999px;padding:5px 14px;font-size:11px;color:#374151;margin-bottom:16px;">
        <div style="width:6px;height:6px;border-radius:50%;background:#155EEF;"></div>
        Edveo Intelligence™
      </div>
      <h2 style="font-size:32px;font-weight:700;color:#0A2540;line-height:1.2;margin:0 0 10px;">Your institute runs on autopilot.<br>Edveo Intelligence™ makes it happen.</h2>
      <p style="font-size:14px;color:#6B7280;max-width:480px;margin:0 auto;line-height:1.6;">Not a chatbot. Not a gimmick. A built-in AI that watches your institute data and acts — so you don't have to.</p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px;">

      <div style="background:#fff;border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;">
        <div style="width:36px;height:36px;background:#EAF1FE;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155EEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div style="font-size:13px;font-weight:600;color:#0A2540;margin-bottom:6px;">Sends fee reminders automatically</div>
        <div style="font-size:12px;color:#6B7280;line-height:1.5;margin-bottom:10px;">Edveo detects overdue fees and sends WhatsApp reminders to parents — without you lifting a finger.</div>
        <div style="font-size:11px;color:#155EEF;font-weight:500;">✓ Zero manual follow-up. Ever.</div>
      </div>

      <div style="background:#fff;border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;">
        <div style="width:36px;height:36px;background:#EAF1FE;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155EEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <div style="font-size:13px;font-weight:600;color:#0A2540;margin-bottom:6px;">Flags at-risk students early</div>
        <div style="font-size:12px;color:#6B7280;line-height:1.5;margin-bottom:10px;">When a student's attendance drops or quiz scores fall, Edveo alerts you immediately — before they drop out.</div>
        <div style="font-size:11px;color:#155EEF;font-weight:500;">✓ Catch problems before they become losses.</div>
      </div>

      <div style="background:#fff;border:1.5px solid #E5E7EB;border-radius:12px;padding:20px;">
        <div style="width:36px;height:36px;background:#EAF1FE;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#155EEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        </div>
        <div style="font-size:13px;font-weight:600;color:#0A2540;margin-bottom:6px;">Tells you which batch needs attention</div>
        <div style="font-size:12px;color:#6B7280;line-height:1.5;margin-bottom:10px;">Every morning, Edveo gives you a daily brief — fees pending, attendance dips, and what needs your attention today.</div>
        <div style="font-size:11px;color:#155EEF;font-weight:500;">✓ Your institute summarised in 10 seconds.</div>
      </div>

    </div>

    <div style="background:#0A2540;border-radius:12px;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="width:8px;height:8px;border-radius:50%;background:#2E90FA;flex-shrink:0;"></div>
        <div style="font-size:13px;color:#fff;font-weight:500;">Edveo Intelligence™ is built in — always on, no setup needed.</div>
      </div>
      <div style="font-size:12px;color:rgba(255,255,255,0.45);white-space:nowrap;flex-shrink:0;">Included in all plans · No extra charge</div>
    </div>

  </div>
</section>
<!-- EDVEO AI FEATURE SECTION END -->` }} />

      {/* Mobile App — standalone premium section */}
      <MobileAppBanner />

      <div dangerouslySetInnerHTML={{ __html: `<!-- COST SECTION START -->
<section style="background:#F9FAFB;padding:64px 32px;">

  <div style="text-align:center;margin-bottom:48px;">
    <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;color:#DC2626;margin-bottom:12px;">THE COST OF DOING NOTHING</div>
    <h2 style="font-size:32px;font-weight:700;color:#0A2540;line-height:1.2;margin-bottom:12px;">A typical day running your institute<br>without Edveo</h2>
    <p style="font-size:14px;color:#6B7280;max-width:480px;margin:0 auto;line-height:1.6;">If any of these sound familiar, you're spending more time managing admin than teaching — and losing money doing it.</p>
  </div>

  <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden;margin-bottom:16px;max-width:900px;margin-left:auto;margin-right:auto;">

    <div style="background:#0A2540;padding:12px 20px;display:flex;align-items:center;gap:8px;">
      <div style="font-size:12px;font-weight:600;color:#fff;">📅 Monday morning — before Edveo</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.4);margin-left:auto;">Happens every single week</div>
    </div>

    <div style="padding:0;">

      <div style="display:grid;grid-template-columns:1fr 40px 1fr;align-items:center;padding:20px 20px;border-bottom:1px solid #F3F4F6;gap:0;">
        <div style="padding-right:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#DC2626;margin-bottom:6px;">THE PROBLEM</div>
          <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#7F1D1D;line-height:1.5;font-style:italic;">"I have to message every parent individually to remind them about fees. Some ignore me for weeks. I never know who has paid until my staff checks the register manually."</div>
          </div>
          <div style="font-size:11px;color:#DC2626;font-weight:500;">⏱ 3–4 hrs/week lost chasing fees</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;">
          <div style="width:28px;height:28px;border-radius:50%;background:#EAF1FE;border:1px solid #C3D0EC;display:flex;align-items:center;justify-content:center;font-size:12px;color:#155EEF;flex-shrink:0;">→</div>
        </div>
        <div style="padding-left:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#15803D;margin-bottom:6px;">WITH EDVEO</div>
          <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#14532D;line-height:1.5;">Edveo sends automatic fee reminders on WhatsApp. You see exactly who has paid, who hasn't, and how much is pending — in real time. Zero manual follow-up.</div>
          </div>
          <div style="font-size:11px;color:#15803D;font-weight:500;">✓ ₹40K–₹80K recovered per year</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 40px 1fr;align-items:center;padding:20px 20px;border-bottom:1px solid #F3F4F6;gap:0;">
        <div style="padding-right:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#DC2626;margin-bottom:6px;">THE PROBLEM</div>
          <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#7F1D1D;line-height:1.5;font-style:italic;">"A student stopped coming 3 weeks ago. I found out only when their parent called asking why results were low. By then it was too late to help them."</div>
          </div>
          <div style="font-size:11px;color:#DC2626;font-weight:500;">⏱ Dropouts you never see coming</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;">
          <div style="width:28px;height:28px;border-radius:50%;background:#EAF1FE;border:1px solid #C3D0EC;display:flex;align-items:center;justify-content:center;font-size:12px;color:#155EEF;flex-shrink:0;">→</div>
        </div>
        <div style="padding-left:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#15803D;margin-bottom:6px;">WITH EDVEO</div>
          <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#14532D;line-height:1.5;">Edveo flags students with dropping attendance before they disappear. You get an alert when a student misses 3 classes in a row — while there's still time to intervene.</div>
          </div>
          <div style="font-size:11px;color:#15803D;font-weight:500;">✓ Catch at-risk students early</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 40px 1fr;align-items:center;padding:20px 20px;border-bottom:1px solid #F3F4F6;gap:0;">
        <div style="padding-right:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#DC2626;margin-bottom:6px;">THE PROBLEM</div>
          <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#7F1D1D;line-height:1.5;font-style:italic;">"My attendance is in one register, fees in an Excel sheet, timetable on a whiteboard, and student contacts in WhatsApp. I need to open 4 things just to answer one parent's question."</div>
          </div>
          <div style="font-size:11px;color:#DC2626;font-weight:500;">⏱ 8–10 hrs/week on admin alone</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;">
          <div style="width:28px;height:28px;border-radius:50%;background:#EAF1FE;border:1px solid #C3D0EC;display:flex;align-items:center;justify-content:center;font-size:12px;color:#155EEF;flex-shrink:0;">→</div>
        </div>
        <div style="padding-left:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#15803D;margin-bottom:6px;">WITH EDVEO</div>
          <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#14532D;line-height:1.5;">Everything is in one dashboard — attendance, fees, timetable, student profiles, parent contacts. Answer any question in 10 seconds without leaving your phone.</div>
          </div>
          <div style="font-size:11px;color:#15803D;font-weight:500;">✓ One tab. Everything. Always.</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 40px 1fr;align-items:center;padding:20px 20px;gap:0;">
        <div style="padding-right:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#DC2626;margin-bottom:6px;">THE PROBLEM</div>
          <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#7F1D1D;line-height:1.5;font-style:italic;">"I don't actually know if my institute is growing or shrinking. I have no monthly revenue number, no enrollment trend, nothing. I'm running blind."</div>
          </div>
          <div style="font-size:11px;color:#DC2626;font-weight:500;">⏱ No visibility = no control</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;">
          <div style="width:28px;height:28px;border-radius:50%;background:#EAF1FE;border:1px solid #C3D0EC;display:flex;align-items:center;justify-content:center;font-size:12px;color:#155EEF;flex-shrink:0;">→</div>
        </div>
        <div style="padding-left:16px;">
          <div style="font-size:9px;font-weight:600;letter-spacing:0.06em;color:#15803D;margin-bottom:6px;">WITH EDVEO</div>
          <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:10px 14px;margin-bottom:6px;">
            <div style="font-size:12px;color:#14532D;line-height:1.5;">Your institute health score updates daily — revenue, retention, enrollment trends, batch performance. You know exactly how your institute is doing at any moment.</div>
          </div>
          <div style="font-size:11px;color:#15803D;font-weight:500;">✓ Full clarity. Every day.</div>
        </div>
      </div>

    </div>
  </div>

  <div style="background:#0A2540;border-radius:12px;padding:24px 28px;display:grid;grid-template-columns:repeat(3,1fr);gap:0;max-width:900px;margin:0 auto 32px;">
    <div style="text-align:center;padding:0 16px;border-right:1px solid rgba(255,255,255,0.08);">
      <div style="font-size:28px;font-weight:700;color:#4ADE80;margin-bottom:4px;">8 hrs</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.55);line-height:1.4;">saved every week<br>on admin — from day one</div>
    </div>
    <div style="text-align:center;padding:0 16px;border-right:1px solid rgba(255,255,255,0.08);">
      <div style="font-size:28px;font-weight:700;color:#4ADE80;margin-bottom:4px;">₹40K+</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.55);line-height:1.4;">in fee leakage recovered<br>per year on average</div>
    </div>
    <div style="text-align:center;padding:0 16px;">
      <div style="font-size:28px;font-weight:700;color:#4ADE80;margin-bottom:4px;">0</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.55);line-height:1.4;">manual WhatsApp reminders<br>sent by you ever again</div>
    </div>
  </div>

  <div style="text-align:center;">
    <div style="font-size:13px;color:#6B7280;margin-bottom:14px;">Still running on WhatsApp and Excel? It's costing you more than you think.</div>
    <a href="https://wa.me/919895656279?text=Hi%2C+I%27m+interested+in+Edveo+for+my+institute" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#155EEF;color:#fff;font-size:13px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;">See how Edveo fixes this →</a>
  </div>

</section>
<!-- COST SECTION END -->` }} />



      {/* Go Live — objection-closer, lives near the decision point */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "12px" }}>Go Live in 1 Min</h2>
          <p style={{ color: "#9CA3AF", marginBottom: "40px" }}>No complex coding. No lengthy migrations.</p>

          <div className={styles.timelineGrid}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>1</div>
              <h3>Sign Up</h3>
              <p>Quick onboarding with your institute details.</p>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>2</div>
              <h3>Configure</h3>
              <p>Upload student data &amp; setup your fee structure.</p>
            </div>
            <div className={styles.timelineItem}>
              <div className={`${styles.timelineNumber} ${styles.timelineNumberSuccess}`}>3</div>
              <h3>Go Live</h3>
              <p>Apps published. Classes started. Revenue flowing.</p>
            </div>
          </div>

          <div className={styles.trustBarSection}>
            <div className={styles.trustBarContainer}>
              <div className={styles.trustBarItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                99.9% Uptime SLA
              </div>
              <div className={styles.trustBarItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                24 x 7 Support
              </div>
              <div className={styles.trustBarItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                Data Security Certified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Objection Handling */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div className={styles.faqLeft}>
            <p className={styles.faqEyebrow}>Common questions</p>
            <h2 className={styles.faqTitle}>Everything you want to know before you sign up.</h2>
            <p className={styles.faqSub}>
              Still have a question?{" "}
              <a href="/contact" className={styles.faqLink}>Talk to our team →</a>
            </p>
          </div>
          <div className={styles.faqRight}>
            {[
              {
                q: "What happens to my student data if I stay on the free plan?",
                a: "Nothing is deleted. Your courses, student records, and progress data stay preserved. You can upgrade when you need more capacity, and you can export your data at any time.",
              },
              {
                q: "Can I import my existing students and fee records?",
                a: "Yes. Edveo has a one-click CSV import for student data, fee history, and course enrollments. Our onboarding team migrates your data with you — it typically takes under 20 minutes for institutes with up to 500 students.",
              },
              {
                q: "Will my students lose their progress if I move from another platform?",
                a: "No. We import completion records and progress history from most major platforms (Udemy, Teachable, Learnyst, Thinkific). Students log in and pick up exactly where they left off.",
              },
              {
                q: "Do you take a cut of my course revenue?",
                a: "Never. Edveo charges a flat monthly subscription — not a percentage of your earnings. Every rupee your students pay goes directly into your Razorpay account. Your revenue is yours.",
              },
              {
                q: "Is my student data safe? Where is it stored?",
                a: "All data is stored on servers in India, fully isolated per account. We comply with the IT Act 2000 and applicable data protection rules. No student data is ever shared with or accessible to other institutes on the platform.",
              },
              {
                q: "Can I run both recorded courses and live batches on the same platform?",
                a: "Yes — hybrid delivery is a first-class feature. You can mix pre-recorded video modules with scheduled live sessions in the same course. Students see everything in one place, not across two different apps.",
              },
              {
                q: "What if I need help setting things up?",
                a: "Every plan includes onboarding support. We get on a call, set up your portal together, and make sure you're live before we hang up. For Business and Scale plans, you get a dedicated account manager reachable on WhatsApp.",
              },
            ].map(({ q, a }) => (
              <details key={q} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{q}</summary>
                <p className={styles.faqAnswer}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        variant="dark"
        headline="Still managing fees on Excel and attendance in a register?"
        accentSub="Join 5 Kerala coaching institutes already running on Edveo. Free to start. No setup fees. Live in 5 minutes."
        primaryLabel="Get a free demo →"
        secondaryLabel="Talk to an Expert"
        secondaryHref={COMPANY_WHATSAPP_URL}
        trustItems={["Free forever", "No credit card required", "Data stored in India", "Cancel anytime"]}
      />

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
