import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edveo — AI-Powered Institute Management Platform",
  description:
    "Run your coaching institute with AI agents that handle fees, attendance, admissions, and student analytics — automatically. Free to start, live in 5 minutes.",
  keywords:
    "institute management, coaching software, LMS, ERP, CRM, fee management, attendance tracking, education platform, India",
  openGraph: {
    title: "Edveo — AI-Powered Institute Management Platform",
    description:
      "One platform to run your entire coaching institute. LMS + ERP + CRM with built-in AI.",
    siteName: "Edveo",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
