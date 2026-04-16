import { Suspense } from "react";
import SignupVerifyClient from "./SignupVerifyClient";

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
      Loading…
    </div>
  );
}

export default function SignupVerifyPage() {
  return (
    <Suspense fallback={<VerifyFallback />}>
      <SignupVerifyClient />
    </Suspense>
  );
}
