import type { Metadata } from "next";
import Link from "next/link";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import styles from "../privacy/privacy.module.css";

export const metadata: Metadata = {
  title: "Terms of Service — Edveo",
  description:
    "The terms and conditions governing use of the Edveo platform by educational institutions, educators, and students.",
};

const LAST_UPDATED = "25 April 2026";
const CONTACT_EMAIL = "legal@edveo.com";
const COMPANY_NAME = "Edveo Technologies Private Limited";

export default function TermsPage() {
  return (
    <>
      <SiteNavbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Legal</p>
            <h1 className={styles.title}>Terms of Service</h1>
            <p className={styles.meta}>Last updated: {LAST_UPDATED}</p>
          </header>

          <div className={styles.body}>
            <p>
              These Terms of Service ("<strong>Terms</strong>") constitute a legally binding agreement
              between you and {COMPANY_NAME} ("<strong>Edveo</strong>", "<strong>we</strong>",
              "<strong>us</strong>") governing your access to and use of the Edveo platform, website,
              mobile applications, and related services (the "<strong>Services</strong>").
            </p>
            <p>
              By creating an account, clicking "I agree", or otherwise accessing the Services, you
              confirm that you have read, understood, and agree to be bound by these Terms. If you are
              accepting on behalf of an institution, you represent that you have authority to bind that
              institution to these Terms.
            </p>

            <h2>1. Eligibility</h2>
            <p>
              You must be at least 18 years old and legally capable of entering into contracts under
              Indian law to create a Tenant account. Students may use the Services through an
              institution that has accepted these Terms on their behalf.
            </p>

            <h2>2. Account Registration and Tenants</h2>
            <p>
              Each institution registers as a "<strong>Tenant</strong>" on the Edveo platform. You are
              responsible for:
            </p>
            <ul>
              <li>Providing accurate and complete registration information.</li>
              <li>Maintaining the security of your account credentials.</li>
              <li>All activity that occurs under your account.</li>
              <li>Notifying us immediately of any unauthorised access at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</li>
            </ul>
            <p>
              You may not share login credentials across multiple institutions or use one Tenant account
              to serve multiple legally distinct entities without a separate licence agreement.
            </p>

            <h2>3. Subscription Plans and Payment</h2>
            <p>
              Access to paid features requires a valid subscription. Subscriptions are billed in advance
              on a monthly or annual basis. All fees are:
            </p>
            <ul>
              <li>Quoted and charged in Indian Rupees (INR) inclusive of applicable taxes unless stated otherwise.</li>
              <li>Non-refundable except as expressly set out in our Refund Policy or required by law.</li>
              <li>Subject to change with 30 days' written notice for existing subscribers.</li>
            </ul>
            <p>
              Payment is processed by Razorpay. By providing payment details, you authorise Edveo to
              charge the applicable fees to your chosen payment method. Failure to pay may result in
              suspension or termination of your account after 7 days' notice.
            </p>

            <h2>4. Acceptable Use</h2>
            <p>You agree not to use the Services to:</p>
            <ul>
              <li>Violate any applicable Indian or international law or regulation.</li>
              <li>Upload, distribute, or transmit content that is unlawful, defamatory, obscene, or infringes third-party intellectual property rights.</li>
              <li>Attempt to gain unauthorised access to any part of the platform or another tenant's data.</li>
              <li>Reverse-engineer, decompile, or otherwise attempt to derive source code from the Services.</li>
              <li>Use the Services to send unsolicited commercial communications (spam).</li>
              <li>Introduce malware, viruses, or other malicious code.</li>
              <li>Resell or sublicence access to the Services without written consent from Edveo.</li>
            </ul>

            <h2>5. Your Content</h2>
            <p>
              You retain ownership of all content, data, and materials you upload to the platform
              ("<strong>Your Content</strong>"). By uploading Your Content, you grant Edveo a limited,
              non-exclusive, royalty-free licence to host, process, and display Your Content solely to
              provide the Services to you.
            </p>
            <p>
              You represent and warrant that You Content does not violate any third-party rights or
              applicable law. You are solely responsible for the accuracy, legality, and appropriateness
              of Your Content.
            </p>

            <h2>6. Data and Privacy</h2>
            <p>
              Our collection and use of personal information is governed by our{" "}
              <Link href="/privacy">Privacy Policy</Link>, which is incorporated into these Terms by
              reference. As a Tenant, you are the data controller for student and staff personal data
              processed through your account; Edveo acts as a data processor on your instructions.
            </p>
            <p>
              You must maintain a lawful basis for processing personal data of students, staff, and
              parents in accordance with applicable Indian law, including the Information Technology Act,
              2000 and rules thereunder.
            </p>

            <h2>7. Intellectual Property</h2>
            <p>
              The Edveo platform, brand, software, design, trademarks, and all related intellectual
              property are owned by {COMPANY_NAME}. These Terms do not transfer any ownership to you.
              You receive only a limited, revocable, non-transferable right to use the Services as
              described here.
            </p>
            <p>
              "Edveo Intelligence™" is a trademark of {COMPANY_NAME}. All rights reserved.
            </p>

            <h2>8. Availability and Support</h2>
            <p>
              We target 99.9% monthly uptime, excluding scheduled maintenance windows and events
              outside our reasonable control. Scheduled maintenance will be communicated at least 24
              hours in advance where feasible.
            </p>
            <p>
              Support is provided via the Help Centre and email. Response times depend on your
              subscription plan. Edveo does not guarantee resolution times but will use reasonable
              endeavours to resolve issues promptly.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by Indian law, Edveo's total liability to you for any
              claim arising under these Terms shall not exceed the fees paid by you to Edveo in the
              three months preceding the event giving rise to the claim.
            </p>
            <p>
              Edveo shall not be liable for indirect, incidental, consequential, special, or exemplary
              damages (including loss of revenue, data, or business opportunity) even if advised of the
              possibility of such damages.
            </p>

            <h2>10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Edveo, its directors, employees, and agents from
              any claims, losses, damages, and expenses (including reasonable legal fees) arising from:
              (a) your use of the Services in violation of these Terms; (b) Your Content; or (c) your
              violation of any third-party rights.
            </p>

            <h2>11. Term and Termination</h2>
            <p>
              These Terms remain in effect while you use the Services. Either party may terminate:
            </p>
            <ul>
              <li><strong>You:</strong> By cancelling your subscription and ceasing use. Data export is available for 30 days after cancellation.</li>
              <li><strong>Edveo:</strong> With 30 days' written notice for any reason; immediately upon material breach of these Terms that is not cured within 7 days of notice.</li>
            </ul>
            <p>
              Sections 5, 7, 9, 10, and 13 survive termination.
            </p>

            <h2>12. Changes to Terms</h2>
            <p>
              We may update these Terms. Material changes will be communicated via email and in-platform
              notice at least 14 days before taking effect. Continued use after the effective date
              constitutes acceptance of the revised Terms.
            </p>

            <h2>13. Governing Law and Disputes</h2>
            <p>
              These Terms are governed by the laws of India. Any dispute arising from or relating to
              these Terms shall first be attempted to be resolved through good-faith negotiation. If
              unresolved within 30 days, disputes shall be subject to the exclusive jurisdiction of the
              courts of India.
            </p>

            <h2>14. Contact</h2>
            <p>For legal queries, contact:</p>
            <address className={styles.address}>
              <strong>{COMPANY_NAME}</strong><br />
              Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </address>
            <p>
              For general support, visit our <Link href="/contact">Contact page</Link>.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
