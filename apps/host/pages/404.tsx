import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Micro Frontend Platform</title>
      </Head>

      <div className="error-page">
        <div className="error-content">
          <div className="error-code">
            <span className="digit">4</span>
            <span className="digit glow">0</span>
            <span className="digit">4</span>
          </div>

          <h1>Page Not Found</h1>
          <p>Oops! The page you're looking for has vanished into the void.</p>

          <div className="error-actions">
            <Link href="/" className="btn btn-primary">
              ← Back to Home
            </Link>
            <Link href="/dashboard" className="btn btn-secondary">
              Go to Dashboard
            </Link>
          </div>

          <div className="error-suggestion">
            <p>Perhaps you were looking for:</p>
            <div className="suggestion-links">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/analytics">Analytics</Link>
              <Link href="/auth">Sign In</Link>
            </div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="bg-decoration">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      </div>

      <style jsx>{`
        .error-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 2rem;
        }

        .error-content {
          text-align: center;
          position: relative;
          z-index: 10;
        }

        .error-code {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .digit {
          font-size: 8rem;
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .digit.glow {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 1;
            filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.5));
          }
          50% { 
            opacity: 0.8;
            filter: drop-shadow(0 0 40px rgba(99, 102, 241, 0.8));
          }
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-100);
        }

        p {
          color: var(--neutral-400);
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .btn {
          padding: 0.875rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--neutral-200);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .error-suggestion {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          display: inline-block;
        }

        .error-suggestion p {
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        .suggestion-links {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
        }

        .suggestion-links a {
          color: var(--primary-400);
          text-decoration: none;
          font-weight: 500;
        }

        .suggestion-links a:hover {
          text-decoration: underline;
        }

        .bg-decoration {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }

        .circle-1 {
          width: 400px;
          height: 400px;
          background: #6366f1;
          top: -100px;
          right: -100px;
        }

        .circle-2 {
          width: 300px;
          height: 300px;
          background: #a855f7;
          bottom: -50px;
          left: -50px;
          animation-delay: -2s;
        }

        .circle-3 {
          width: 200px;
          height: 200px;
          background: #ec4899;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }

        @media (max-width: 640px) {
          .digit {
            font-size: 5rem;
          }

          h1 {
            font-size: 1.5rem;
          }

          .error-actions {
            flex-direction: column;
          }

          .suggestion-links {
            flex-direction: column;
            gap: 0.75rem;
          }
        }
      `}</style>
    </>
  );
}
