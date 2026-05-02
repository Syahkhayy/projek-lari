import "./stylesheet.css";

export default function LoginPage() {
  return (
    <div className="login-page">
      <h1 className="login-title">PROJEK LARI</h1>
      <div className="login-card">
        <h2 className="card-title">Welcome back, Hero!</h2>
        <p className="card-desc">Sign in to start your quest.</p>
        <div className="input-stack">
          <div className="input-skeleton" />
          <div className="input-skeleton" />
          <div className="login-btn">LOGIN</div>
        </div>
      </div>
    </div>
  );
}
