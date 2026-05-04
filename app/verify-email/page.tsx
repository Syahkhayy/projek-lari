"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { APP_VERSION, FOOTER_TEXT } from "@/lib/constants";
import "./verify.css";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Load cooldown from localStorage on mount
  useEffect(() => {
    if (!email) return;
    
    const cooldownKey = `resend_cooldown_${email}`;
    const expiry = localStorage.getItem(cooldownKey);
    
    if (expiry) {
      const remaining = Math.ceil((parseInt(expiry) - Date.now()) / 1000);
      if (remaining > 0) {
        setCountdown(remaining);
      } else {
        localStorage.removeItem(cooldownKey);
      }
    }
  }, [email]);

  // Countdown timer logic
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (email) localStorage.removeItem(`resend_cooldown_${email}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, email]);

  const handleResend = async () => {
    if (!email || countdown > 0) return;

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });

      if (error) throw error;

      setMessage("A new racing bib has been sent! Check your inbox.");
      
      // Set 60s cooldown
      const expiry = Date.now() + 60000;
      setCountdown(60);
      localStorage.setItem(`resend_cooldown_${email}`, expiry.toString());
      
    } catch (error: any) {
      setMessage(error.message || "Failed to resend email.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="verify-container quest-pattern">
      <div className="verify-card pixel-card">
        <div className="icon-wrapper">
          <div className="pixel-icon"></div>
        </div>

        <h1 className="verify-title pixel-font">CHECK YOUR MAIL</h1>

        <p className="verify-text">
          A racing bib has been sent to {email ? <strong className="text-primary">{email}</strong> : "your inbox"}.
          Please click the link to verify your identity
          before you can start your running journey!
        </p>

        {message && (
          <div className={`status-message ${isError ? "status-message-error" : "status-message-success"}`}>
            {message}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <Link href="/login" className="pixel-btn pixel-btn-primary btn-center">
            RETURN TO LOGIN
          </Link>

          <div className="resend-box">
            <p className="resend-text">Didn't get the scroll?</p>
            <button 
              onClick={handleResend}
              disabled={loading || countdown > 0}
              className={`pixel-btn pixel-btn-accent btn-full ${(loading || countdown > 0) ? "btn-disabled" : ""}`}
            >
              {loading ? "SENDING..." : countdown > 0 ? `WAIT ${countdown}S` : "RESEND RACING BIB"}
            </button>
          </div>
        </div>
      </div>

      <footer className="verify-footer">
        {APP_VERSION} | {FOOTER_TEXT}
      </footer>
    </main>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div className="verify-container quest-pattern"><p className="pixel-font">Loading...</p></div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
