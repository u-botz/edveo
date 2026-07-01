"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { COMPANY_WHATSAPP_CTA_URL } from "@/lib/companyPublicInfo";
import styles from "./hero.module.css";

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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
  const words = ["Grow", "Run", "Scale", "Protect"];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}></div>
      <div className={styles.heroContainer}>
        
        {/* Eyebrow — product line (matches Intelligence positioning) */}
        <div className={`${styles.eyebrowBadge} ${styles.eyebrowBadgeSolo}`}>
          <span className={styles.eyebrowBadgeText}>Powered by Edveo Intelligence™</span>
        </div>

        {/* Headline */}
        <h1 className={styles.heroHeadline}>
          AI Agents That{" "}
          <span style={{ 
            opacity: fade ? 1 : 0, 
            transition: "opacity 0.5s ease-in-out",
            display: "inline-block",
            color: "#15803D",
            background: "linear-gradient(90deg, #15803D 0%, #10B981 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            {words[index]}
          </span>{" "}
          Your Institution.
        </h1>

        {/* Sub-headline */}
        <p className={styles.heroSub}>
          <span style={{ display: "block", marginBottom: "8px" }}>Every missed enquiry is a lost admission.</span>
          <span style={{ display: "block", marginBottom: "8px" }}>Every unpaid fee is revenue you&apos;ve already earned.</span>
          <span style={{ display: "block" }}>Edveo&apos;s agents handle both — automatically, 24/7.</span>
        </p>

        {/* Micro-copy — directly above primary CTA */}
        <p className={styles.microCopy}>
          Free to start &middot; No Excel needed &middot; Live in under 5 minutes
        </p>

        {/* Actions */}
        <div className={styles.heroActions}>
          <a href={COMPANY_WHATSAPP_CTA_URL} target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>
            Get a free demo <ArrowRightIcon />
          </a>
        </div>

        <style>
          {`
            .sp-wrapper { 
              margin-bottom: 0; 
              padding-bottom: 48px; 
              width: 100%; 
              max-width: 1200px; 
              display: flex; 
              flex-direction: column; 
              align-items: center; 
              position: relative; 
              z-index: 10; 
            }
            .sp-stats-bar { 
              display: flex; 
              justify-content: center; 
              gap: 16px; 
              margin: 16px 0 40px; 
              flex-wrap: wrap; 
            }
            .sp-stat { 
              display: flex; 
              align-items: center; 
              gap: 8px;
              font-size: 14px; 
              font-weight: 600; 
              color: #374151; 
              background: rgba(255, 255, 255, 0.7); 
              backdrop-filter: blur(8px);
              padding: 8px 20px; 
              border-radius: 100px; 
              border: 1px solid rgba(255, 255, 255, 0.8); 
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04), inset 0 0 0 1px rgba(255,255,255,0.5);
              transition: transform 0.2s ease, box-shadow 0.2s ease;
              cursor: default;
            }
            .sp-stat:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(255,255,255,0.8);
            }
            .sp-stat-dot { width: 8px; height: 8px; border-radius: 50%; background: #15803D; box-shadow: 0 0 8px rgba(21, 128, 61, 0.4); }
            
            .sp-testimonials-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; margin-bottom: 0; width: 100%; }
            
            .sp-testimonial-card { 
              position: relative;
              background: linear-gradient(160deg, #ffffff 0%, #fcfdfd 100%);
              border: 1px solid rgba(229, 231, 235, 0.6); 
              border-radius: 20px; 
              padding: 32px; 
              text-align: left; 
              box-sizing: border-box; 
              box-shadow: 0 12px 24px -12px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.02);
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              overflow: hidden;
            }
            
            .sp-testimonial-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1), 0 8px 12px -6px rgba(0, 0, 0, 0.04);
              border-color: rgba(229, 231, 235, 0.9);
            }

            .sp-testimonial-card::before {
              content: '""';
              position: absolute;
              top: 0; left: 0; right: 0;
              height: 4px;
              background: linear-gradient(90deg, #15803D 0%, #34D399 100%);
              opacity: 0;
              transition: opacity 0.3s ease;
            }
            
            .sp-testimonial-card:hover::before {
              opacity: 1;
            }

            .sp-quote-mark {
              position: absolute;
              top: 16px;
              left: 24px;
              font-size: 64px;
              font-family: Georgia, serif;
              color: rgba(21, 128, 61, 0.06);
              line-height: 1;
              pointer-events: none;
            }

            .sp-quote { 
              position: relative;
              font-size: 15px; 
              color: #1F2937; 
              margin-bottom: 24px; 
              font-style: italic; 
              line-height: 1.6; 
              z-index: 1;
            }
            
            .sp-author-row {
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .sp-avatar {
              width: 40px; height: 40px;
              border-radius: 50%;
              background: #DCFCE7;
              color: #15803D;
              display: flex; align-items: center; justify-content: center;
              font-weight: 700; font-size: 16px;
              flex-shrink: 0;
            }

            .sp-author-info {
              display: flex; flex-direction: column; gap: 2px;
            }

            .sp-name { font-size: 15px; font-weight: 700; color: #111827; margin: 0; }
            .sp-institute { font-size: 13px; color: #6B7280; margin: 0; }

            @media (max-width: 768px) {
              .sp-testimonials-row { grid-template-columns: 1fr; }
              .sp-testimonial-card { padding: 24px; }
              .sp-quote-mark { left: 16px; top: 12px; }
            }
          `}
        </style>
        <div className="sp-wrapper">
          <div className="sp-stats-bar">
            <div className="sp-stat">
              <div className="sp-stat-dot"></div>
              5 Institutes Live
            </div>
            <div className="sp-stat">
              <div className="sp-stat-dot"></div>
              Replacing WhatsApp + Excel
            </div>
            <div className="sp-stat">
              <div className="sp-stat-dot"></div>
              Made in Kerala, for Kerala
            </div>
          </div>
          <div className="sp-testimonials-row">
            <div className="sp-testimonial-card">
              <span className="sp-quote-mark">&quot;</span>
              <p className="sp-quote">Fee collection used to take my staff 3 days every month. Now it&apos;s done in the morning automatically.</p>
              <div className="sp-author-row">
                <div className="sp-avatar">S</div>
                <div className="sp-author-info">
                  <p className="sp-name">Sayooj Neduveli</p>
                  <p className="sp-institute">Mentora LearnX, Manjeri</p>
                </div>
              </div>
            </div>
            <div className="sp-testimonial-card">
              <span className="sp-quote-mark">&quot;</span>
              <p className="sp-quote">The AI told me which students were about to drop out before I even noticed. That alone is worth it.</p>
              <div className="sp-author-row">
                <div className="sp-avatar">A</div>
                <div className="sp-author-info">
                  <p className="sp-name">Aiswarya</p>
                  <p className="sp-institute">Mentora Junior, Manjeri</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --- END SP-1 --- */}
      </div>
    </section>
  );
}
