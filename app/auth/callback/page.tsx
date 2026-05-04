"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import "../../verify-email/verify.css";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("verifying"); // 'verifying' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");

    if (token_hash && type) {
      verifyEmail(token_hash, type as any);
    } else {
      setStatus("error");
      setErrorMsg("Invalid or missing verification tokens.");
    }
  }, [searchParams]);

  const verifyEmail = async (token_hash: string, type: "email" | "signup" | "invite" | "recovery" | "email_change") => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type,
      });

      if (error) throw error;

      setStatus("success");
      // Give the user a moment to see the success message
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      setStatus("error");
      setErrorMsg(error.message || "Failed to verify email. The link may have expired.");
    }
  };

  return (
    <main className="verify-container quest-pattern">
      <div className="verify-card pixel-card">
        {status === "verifying" && (
          <>
            <div className="icon-wrapper">
              <div className="pixel-icon animate-spin"></div>
            </div>
            <h1 className="verify-title pixel-font">VERIFYING YOUR BIB...</h1>
            <p className="verify-text">Just a moment, we're checking your race credentials.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="icon-wrapper">
              <div className="pixel-icon icon-success">✅</div>
            </div>
            <h1 className="verify-title pixel-font text-success">BIB VERIFIED!</h1>
            <p className="verify-text">Success! You're cleared for the race. Redirecting to your track...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="icon-wrapper">
              <div className="pixel-icon icon-error">❌</div>
            </div>
            <h1 className="verify-title pixel-font text-error">RACE DELAYED</h1>
            <p className="verify-text">{errorMsg}</p>
            <button 
              onClick={() => router.push("/login")}
              className="pixel-btn pixel-btn-primary btn-full"
            >
              BACK TO STARTING LINE
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<div className="verify-container quest-pattern"><p className="pixel-font">Preparing Track...</p></div>}>
      <CallbackContent />
    </Suspense>
  );
}
