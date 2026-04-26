import type { Metadata } from "next";
import Link from "next/link";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";
import styles from "../legal/legal.module.css";
import { CONTACT_EMAIL } from "@/lib/contactEmail";

export const metadata: Metadata = {
  title: "Privacy Policy — Edveo",
  description:
    "How Ubotz Technologies Private Limited collects, uses, and shares personal data for the Edveo platform, and how you can contact us or request deletion.",
};

const LAST_UPDATED = "26 April 2026";
const COMPANY_NAME = "Ubotz Technologies Private Limited";

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteNavbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Legal</p>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.meta}>Last updated: {LAST_UPDATED}</p>
          </header>

          <div className={styles.body}>
            <p>
              {COMPANY_NAME} (&quot;Ubotz&quot;, &quot;we&quot;, &quot;us&quot;) operates the Edveo
              platform and related websites (the &quot;Services&quot;). This Privacy Policy describes
              how we handle personal information in connection with the Services.
            </p>
            <p>
              By using the Services, you acknowledge this policy. If you do not agree, please do not
              use the Services.
            </p>

            <h2>1. What data we collect</h2>
            <p>Depending on how you use Edveo, we may collect:</p>
            <ul>
              <li>
                <strong>Name</strong> — for example when you register, are invited to an
                organisation on Edveo, or contact us.
              </li>
              <li>
                <strong>Email address</strong> — for account identification, sign-in, and
                communications described below.
              </li>
              <li>
                <strong>Payment information</strong> — when you subscribe or pay fees, payment
                details are collected by our payment processor. We do not store full card numbers on
                our own servers; we may receive limited billing metadata (for example transaction
                references, subscription status, and billing contact details) needed to operate
                billing.
              </li>
            </ul>

            <h2>2. How we use your data</h2>
            <p>We use personal information only as needed to:</p>
            <ul>
              <li>
                <strong>Operate the platform</strong> — provide accounts, authentication, hosting,
                security, support, and the features you or your organisation have subscribed to.
              </li>
              <li>
                <strong>Send transactional emails only</strong> — for example account verification,
                password reset, receipts and billing notices, service announcements that affect your
                account, and other messages that are directly related to a transaction or your use of
                the Services. We do not use your data to send unrelated marketing email unless you
                have separately opted in where the law requires consent.
              </li>
            </ul>

            <h2>3. Who we share data with</h2>
            <p>We do not sell your personal information. We share it only with:</p>
            <ul>
              <li>
                <strong>Payment processors</strong> — to authorise, process, and reconcile payments
                and subscriptions. Their use of your information is governed by their own terms and
                privacy policies.
              </li>
              <li>
                <strong>Email provider</strong> — to deliver the transactional emails described
                above. The provider processes message content and delivery metadata on our behalf.
              </li>
            </ul>
            <p>
              We may also disclose information if required by law, or to protect the rights, safety,
              and security of Ubotz, our users, and others.
            </p>

            <h2>4. How you can request deletion</h2>
            <p>
              You may request deletion of personal information associated with your account by
              emailing us at the address below. We will verify your request where reasonable and
              delete or anonymise data that we are not legally required to retain (for example
              certain accounting or tax records).
            </p>
            <p>
              If your access is through an organisation (for example a school or institute), that
              organisation may also hold or control related data; you may need to contact them for
              changes on their tenant.
            </p>

            <h2>5. Contact for privacy queries</h2>
            <p>
              For questions about this policy, data practices, or to exercise your rights (including
              deletion), contact:
            </p>
            <address className={styles.address}>
              <strong>{COMPANY_NAME}</strong>
              <br />
              Email:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </address>
            <p>
              For general product support, see our{" "}
              <Link href="/contact">Contact</Link> page.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
