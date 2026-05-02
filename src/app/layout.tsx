import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edveo — Run your institution.",
  description: "One Platform. LMS + ERP + CRM. Ready Today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
