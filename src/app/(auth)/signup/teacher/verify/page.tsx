import { Suspense } from "react";
import TeacherVerifyClient from "./TeacherVerifyClient";

function VerifyFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        color: "#64748B",
        fontFamily: "var(--font-body, system-ui, sans-serif)",
        fontSize: 15,
      }}
    >
      Verifying your email…
    </div>
  );
}

export default function TeacherSignupVerifyPage() {
  return (
    <Suspense fallback={<VerifyFallback />}>
      <TeacherVerifyClient />
    </Suspense>
  );
}
