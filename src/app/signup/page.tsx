import { Suspense } from "react";
import RegisterFlowClient from "../(auth)/register/RegisterFlowClient";

function SignupFallback() {
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

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupFallback />}>
      <RegisterFlowClient />
    </Suspense>
  );
}
