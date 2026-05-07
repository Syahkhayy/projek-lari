"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { APP_VERSION, FOOTER_TEXT } from "@/lib/constants";
import "./stylesheet.css";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        // Redirect to the verification pending page with email param
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        return;
      }
      router.push("/dashboard");
    } catch (error: any) {
      if (error.message?.includes("Email not confirmed")) {
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        return;
      }
      setErrorMsg(error.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-title">PROJEK LARI</h1>

      <div className={`login-card ${!isLogin ? "signup-mode" : ""}`}>
        <h2 className="card-title">
          {isLogin ? "Welcome back, Champion!" : "Join the Pack!"}
        </h2>
        <p className="card-desc">
          {isLogin
            ? "Sign in to continue your journey."
            : "Create an account to start your journey."}
        </p>

        <form onSubmit={handleAuth} className="input-stack">
          {errorMsg && <div className="error-message">{errorMsg}</div>}

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="hero@projeklari.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                required
              />
              <button
                type="button"
                className="show-password-btn"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                onTouchStart={() => setShowPassword(true)}
                onTouchEnd={() => setShowPassword(false)}
                tabIndex={-1}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "PROCESSING..." : isLogin ? "LOGIN" : "SIGN UP"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="toggle-link"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg("");
              setEmail("");
              setPassword("");
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>

      <footer className="login-footer">
        {APP_VERSION} | {FOOTER_TEXT}
      </footer>
    </div>
  );
}
