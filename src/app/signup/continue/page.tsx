import { Suspense } from "react";
import SignupContinueClient from "./SignupContinueClient";

function ContinueFallback() {
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

export default function SignupContinuePage() {
  return (
    <Suspense fallback={<ContinueFallback />}>
      <SignupContinueClient />
    </Suspense>
  );
}
