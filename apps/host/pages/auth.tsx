import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo purposes, redirect to dashboard
    window.location.href = '/dashboard';
  };

  return (
    <>
      <Head>
        <title>{isLogin ? 'Sign In' : 'Sign Up'} | Micro Frontend Platform</title>
      </Head>

      <div className="auth-page">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="brand-content">
            <Link href="/" className="brand-logo">
              <span className="logo-icon">🌐</span>
              <span className="logo-text">MicroFE Platform</span>
            </Link>

            <h1 className="brand-title">
              Build <span className="gradient-text">Scalable</span> Apps
              <br />with Micro Frontends
            </h1>

            <p className="brand-description">
              Enterprise-grade architecture for modern web applications.
              Independent development, unified experience.
            </p>

            <div className="brand-features">
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <span>Lightning fast builds</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span>Enterprise security</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📦</span>
                <span>Independent deployments</span>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="brand-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="auth-form-container">
          <div className="auth-form-wrapper">
            <div className="auth-header">
              <h2>{isLogin ? 'Welcome back' : 'Create account'}</h2>
              <p>{isLogin ? 'Sign in to your account' : 'Start your journey today'}</p>
            </div>

            {/* Social Login */}
            <div className="social-login">
              <button className="social-btn glass">
                <span>🔵</span> Continue with Google
              </button>
              <button className="social-btn glass">
                <span>⚫</span> Continue with GitHub
              </button>
            </div>

            <div className="divider">
              <span>or continue with email</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required={!isLogin}
                    className="form-input"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="form-input"
                />
              </div>

              {isLogin && (
                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <div className="auth-footer">
              {isLogin ? (
                <p>
                  Don't have an account?{' '}
                  <button onClick={() => setIsLogin(false)} className="switch-btn">
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setIsLogin(true)} className="switch-btn">
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
        }

        /* Left Side - Branding */
        .auth-branding {
          flex: 1;
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%);
          padding: var(--space-3xl);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .brand-content {
          position: relative;
          z-index: 10;
          max-width: 500px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          text-decoration: none;
          color: inherit;
          margin-bottom: var(--space-3xl);
        }

        .logo-icon {
          font-size: 2rem;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .brand-title {
          font-size: 3rem;
          line-height: 1.1;
          margin-bottom: var(--space-lg);
        }

        .brand-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: var(--space-2xl);
          line-height: 1.6;
        }

        .brand-features {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          color: rgba(255, 255, 255, 0.8);
        }

        .feature-icon {
          font-size: 1.25rem;
        }

        .brand-decoration {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .decoration-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
        }

        .circle-1 {
          width: 400px;
          height: 400px;
          background: #a855f7;
          top: -100px;
          right: -100px;
        }

        .circle-2 {
          width: 300px;
          height: 300px;
          background: #6366f1;
          bottom: -50px;
          left: -50px;
        }

        .circle-3 {
          width: 200px;
          height: 200px;
          background: #ec4899;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        /* Right Side - Form */
        .auth-form-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-2xl);
          background: var(--neutral-900);
        }

        .auth-form-wrapper {
          width: 100%;
          max-width: 400px;
        }

        .auth-header {
          margin-bottom: var(--space-xl);
        }

        .auth-header h2 {
          font-size: 1.75rem;
          margin-bottom: var(--space-sm);
        }

        .auth-header p {
          color: var(--neutral-400);
        }

        .social-login {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          margin-bottom: var(--space-lg);
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          padding: var(--space-md);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          color: var(--neutral-200);
          cursor: pointer;
          transition: all var(--transition-base);
          font-size: 0.9rem;
        }

        .social-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .divider {
          position: relative;
          text-align: center;
          margin: var(--space-lg) 0;
        }

        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        .divider span {
          position: relative;
          padding: 0 var(--space-md);
          background: var(--neutral-900);
          color: var(--neutral-500);
          font-size: 0.875rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .form-group label {
          font-size: 0.875rem;
          color: var(--neutral-300);
          font-weight: 500;
        }

        .form-input {
          padding: var(--space-md);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          color: var(--neutral-100);
          font-size: 1rem;
          transition: all var(--transition-base);
        }

        .form-input::placeholder {
          color: var(--neutral-500);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-500);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          color: var(--neutral-400);
          font-size: 0.875rem;
          cursor: pointer;
        }

        .forgot-link {
          color: var(--primary-400);
          font-size: 0.875rem;
        }

        .submit-btn {
          padding: var(--space-md);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: var(--radius-lg);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-base);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .auth-footer {
          margin-top: var(--space-xl);
          text-align: center;
          color: var(--neutral-400);
        }

        .switch-btn {
          background: none;
          border: none;
          color: var(--primary-400);
          cursor: pointer;
          font-size: inherit;
          font-weight: 600;
        }

        .switch-btn:hover {
          color: var(--primary-300);
        }

        @media (max-width: 1024px) {
          .auth-branding {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
