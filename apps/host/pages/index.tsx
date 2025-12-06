import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Animated counter hook
function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeOut);

      setCount(current);
      countRef.current = current;

      if (now < endTime) {
        requestAnimationFrame(tick);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(tick);
  }, [isVisible, end, duration, start]);

  return { count, ref };
}

// Animated stat card component
const AnimatedStatCard: React.FC<{ value: number; label: string; suffix: string; delay: number }> = ({
  value, label, suffix, delay
}) => {
  const { count, ref } = useCountUp(value, 2000 + delay);

  return (
    <div ref={ref} className="card text-center stat-card">
      <div className="stat-value gradient-text">
        {count}{suffix}
      </div>
      <p className="stat-label">{label}</p>
      <style jsx>{`
        .stat-card {
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%);
          pointer-events: none;
        }
        .stat-value {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .stat-label {
          color: var(--neutral-400);
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

// Tech stack logos
const techStack = [
  { name: 'Next.js', logo: '▲' },
  { name: 'TypeScript', logo: 'TS' },
  { name: 'React', logo: '⚛' },
  { name: 'Turborepo', logo: '◈' },
];

// Feature card data
const features = [
  {
    icon: '🏗️',
    title: 'Module Federation',
    description: 'Runtime integration of independent applications with shared dependencies',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    icon: '📦',
    title: 'Monorepo Architecture',
    description: 'Turborepo-powered workspace with optimized builds and caching',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    icon: '🎨',
    title: 'Shared Design System',
    description: 'Consistent UI components and design tokens across all applications',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    icon: '🔐',
    title: 'Unified Authentication',
    description: 'Single sign-on across all micro frontends with session sharing',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    icon: '📊',
    title: 'Independent Deployment',
    description: 'Each micro frontend deploys independently without affecting others',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    icon: '⚡',
    title: 'TypeScript First',
    description: 'End-to-end type safety with shared types across applications',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },
];

// Stats data
const stats = [
  { value: 7, label: 'Micro Frontends', suffix: '' },
  { value: 6, label: 'Shared Packages', suffix: '' },
  { value: 56, label: 'Unit Tests', suffix: '+' },
  { value: 100, label: 'TypeScript', suffix: '%' },
];

// Micro frontend apps
const microFrontends = [
  { name: 'Auth', path: '/auth', icon: '🔐', desc: 'Authentication & Authorization', color: '#6366f1' },
  { name: 'Dashboard', path: '/dashboard', icon: '📊', desc: 'Main Dashboard & Widgets', color: '#8b5cf6' },
  { name: 'Analytics', path: '/analytics', icon: '📈', desc: 'Data Visualization & Reports', color: '#d946ef' },
  { name: 'Billing', path: '/billing', icon: '💳', desc: 'Payments & Subscriptions', color: '#ec4899' },
  { name: 'Admin', path: '/admin', icon: '⚙️', desc: 'System Administration', color: '#f43f5e' },
  { name: 'Notifications', path: '/notifications', icon: '🔔', desc: 'Real-time Notifications', color: '#f97316' },
];

// Placeholder auth form
const PlaceholderAuthForm: React.FC = () => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 'var(--radius-lg)',
    padding: '1.5rem'
  }}>
    <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Sign In</h3>
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--neutral-400)', fontSize: '0.875rem' }}>Email</label>
      <input type="email" placeholder="you@example.com" style={{
        width: '100%',
        padding: '0.75rem',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0.5rem',
        color: 'white'
      }} />
    </div>
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--neutral-400)', fontSize: '0.875rem' }}>Password</label>
      <input type="password" placeholder="••••••••" style={{
        width: '100%',
        padding: '0.75rem',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0.5rem',
        color: 'white'
      }} />
    </div>
    <button className="btn btn-primary" style={{ width: '100%' }}>Sign In</button>
    <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--neutral-500)', fontSize: '0.875rem' }}>
      Demo from <code style={{ color: 'var(--primary-400)' }}>auth/LoginForm</code>
    </p>
  </div>
);

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Micro Frontend Platform | Enterprise-Grade Architecture</title>
        <meta name="description" content="A modular, enterprise-grade Micro Frontend Platform built using Next.js 15+, Module Federation, TypeScript, and Turborepo" />
      </Head>

      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Navigation */}
      <nav className="glass fixed w-full z-50" style={{ padding: 'var(--space-md) 0' }}>
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center gap-sm" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '1.5rem' }}>🌐</span>
            <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>MicroFE Platform</span>
          </Link>
          <div className="flex gap-lg items-center">
            <Link href="/dashboard" style={{ color: 'var(--neutral-300)', fontWeight: 500 }}>Dashboard</Link>
            <Link href="/analytics" style={{ color: 'var(--neutral-300)', fontWeight: 500 }}>Analytics</Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="github-btn"
            >
              <span className="github-icon">⭐</span>
              <span>Star on GitHub</span>
              <span className="github-count">1.2k</span>
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero-section min-h-screen flex items-center relative overflow-hidden" style={{ paddingTop: '6rem' }}>
          <div className="container">
            <div className="text-center" style={{ maxWidth: '900px', margin: '0 auto' }}>
              {/* Tech Stack Badges */}
              <div className="tech-stack animate-slide-up mb-lg">
                {techStack.map((tech, i) => (
                  <span key={i} className="tech-badge">
                    <span className="tech-logo">{tech.logo}</span>
                    {tech.name}
                  </span>
                ))}
              </div>

              <div className="animate-slide-up">
                <span className="badge mb-lg">🚀 Enterprise-Grade Architecture</span>
              </div>

              <h1 className="animate-slide-up delay-1 mb-lg hero-title">
                <span className="gradient-text-animated">Micro Frontend</span>
                <br />
                Platform
              </h1>

              <p className="animate-slide-up delay-2 hero-subtitle">
                A modular, scalable architecture demonstrating enterprise patterns used by
                <strong style={{ color: 'var(--neutral-200)' }}> AWS, Shopify, Uber, and Atlassian</strong>.
                Built with Next.js, Module Federation, TypeScript, and Turborepo.
              </p>

              <div className="animate-slide-up delay-3 flex gap-md justify-center hero-actions">
                <Link href="/dashboard" className="btn btn-primary btn-lg">
                  Explore Platform →
                </Link>
                <Link href="/auth" className="btn btn-secondary btn-lg">
                  Try Demo
                </Link>
              </div>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-4 mt-3xl animate-fade-in delay-4">
              {stats.map((stat, index) => (
                <AnimatedStatCard
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative" style={{ padding: 'var(--space-3xl) 0' }}>
          <div className="container">
            <div className="text-center mb-3xl">
              <h2 className="gradient-text mb-md">Architecture Features</h2>
              <p style={{ color: 'var(--neutral-400)', maxWidth: '600px', margin: '0 auto' }}>
                Everything you need to build scalable, maintainable micro frontend applications
              </p>
            </div>

            <div className="grid grid-3">
              {features.map((feature, index) => (
                <div key={index} className="card feature-card" style={{ '--hover-glow': feature.gradient } as React.CSSProperties}>
                  <div className="feature-icon" style={{ background: feature.gradient }}>
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Micro Frontends Grid */}
        <section style={{ padding: 'var(--space-3xl) 0' }}>
          <div className="container">
            <div className="text-center mb-3xl">
              <h2 className="gradient-text mb-md">Micro Frontends</h2>
              <p style={{ color: 'var(--neutral-400)', maxWidth: '600px', margin: '0 auto' }}>
                Independent applications that can be developed, tested, and deployed separately
              </p>
            </div>

            <div className="grid grid-3">
              {microFrontends.map((mf, index) => (
                <Link
                  key={index}
                  href={mf.path}
                  className="card mf-card flex items-center gap-lg"
                >
                  <div className="mf-icon" style={{
                    background: `linear-gradient(135deg, ${mf.color}40 0%, ${mf.color}20 100%)`,
                    borderColor: `${mf.color}40`
                  }}>
                    {mf.icon}
                  </div>
                  <div>
                    <h4 className="mf-name">{mf.name}</h4>
                    <p className="mf-desc">{mf.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section style={{ padding: 'var(--space-3xl) 0' }}>
          <div className="container">
            <div className="text-center mb-3xl">
              <h2 className="gradient-text mb-md">Live Demo</h2>
              <p style={{ color: 'var(--neutral-400)', maxWidth: '600px', margin: '0 auto' }}>
                Experience Module Federation in action - components loaded from remote applications
              </p>
            </div>

            <div className="card demo-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div className="demo-header">
                <span className="demo-dot" style={{ background: '#f43f5e' }} />
                <span className="demo-dot" style={{ background: '#fbbf24' }} />
                <span className="demo-dot" style={{ background: '#22c55e' }} />
                <span className="demo-label">auth/LoginForm</span>
              </div>
              <PlaceholderAuthForm />
            </div>
          </div>
        </section>

        {/* Architecture Diagram */}
        <section style={{ padding: 'var(--space-3xl) 0', background: 'rgba(0,0,0,0.2)' }}>
          <div className="container">
            <div className="text-center mb-3xl">
              <h2 className="gradient-text mb-md">Architecture Overview</h2>
              <p style={{ color: 'var(--neutral-400)', maxWidth: '600px', margin: '0 auto' }}>
                Enterprise-grade micro frontend architecture with Module Federation
              </p>
            </div>

            <div className="card architecture-diagram">
              <pre>{`
┌─────────────────────────────────────────────────────────────────┐
│                         HOST SHELL                               │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐  │
│  │   Navigation │   Auth State │   Theme      │   Layout     │  │
│  └──────────────┴──────────────┴──────────────┴──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
     ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
     │     AUTH     │ │  DASHBOARD   │ │  ANALYTICS   │
     │  ──────────  │ │  ──────────  │ │  ──────────  │
     │  • Login     │ │  • Widgets   │ │  • Charts    │
     │  • Register  │ │  • Cards     │ │  • Reports   │
     └──────────────┘ └──────────────┘ └──────────────┘
              │               │               │
              └───────────────┼───────────────┘
                              │
     ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
     │   BILLING    │ │    ADMIN     │ │NOTIFICATIONS │
     └──────────────┘ └──────────────┘ └──────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
     ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
     │   UI-KIT     │ │ SHARED-STATE │ │  API-CLIENT  │
     └──────────────┘ └──────────────┘ └──────────────┘
`}</pre>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ padding: 'var(--space-3xl) 0' }}>
          <div className="container text-center">
            <h2 className="gradient-text mb-md">Ready to Explore?</h2>
            <p style={{ color: 'var(--neutral-400)', maxWidth: '600px', margin: '0 auto var(--space-xl)' }}>
              Dive into the platform and experience the power of micro frontend architecture
            </p>
            <div className="flex gap-md justify-center">
              <Link href="/dashboard" className="btn btn-primary btn-lg">
                Open Dashboard →
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                ⭐ Star on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="glass" style={{ padding: 'var(--space-xl) 0', marginTop: 'var(--space-3xl)' }}>
        <div className="container flex justify-between items-center">
          <p style={{ color: 'var(--neutral-500)' }}>
            © 2024 Micro Frontend Platform. Built with 💜 using Next.js & Module Federation
          </p>
          <div className="flex gap-lg">
            <a href="https://github.com" style={{ color: 'var(--neutral-400)' }}>GitHub</a>
            <Link href="/analytics" style={{ color: 'var(--neutral-400)' }}>Analytics</Link>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* Animated Background */
        .animated-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          animation: float 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          top: -200px;
          right: -200px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #ec4899 0%, #f97316 100%);
          bottom: -150px;
          left: -150px;
          animation-delay: -7s;
        }

        .orb-3 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -14s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -50px) scale(1.1); }
          50% { transform: translate(-30px, 30px) scale(0.95); }
          75% { transform: translate(40px, 40px) scale(1.05); }
        }

        /* Tech Stack Badges */
        .tech-stack {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .tech-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          font-size: 0.875rem;
          color: var(--neutral-300);
        }

        .tech-logo {
          font-weight: 700;
          color: var(--primary-400);
        }

        /* Animated Gradient Text */
        .gradient-text-animated {
          background: linear-gradient(
            135deg,
            #667eea 0%,
            #764ba2 25%,
            #ec4899 50%,
            #f97316 75%,
            #667eea 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 8s ease infinite;
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Hero */
        .hero-title {
          font-size: 4.5rem;
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--neutral-400);
          max-width: 700px;
          margin: 0 auto var(--space-xl);
        }

        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }

        /* GitHub Button */
        .github-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          color: var(--neutral-200);
          font-size: 0.875rem;
          text-decoration: none;
          transition: all 0.2s;
        }

        .github-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .github-count {
          padding: 0.125rem 0.5rem;
          background: rgba(99, 102, 241, 0.2);
          border-radius: 9999px;
          font-size: 0.75rem;
          color: var(--primary-400);
        }

        /* Feature cards */
        .feature-card {
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: var(--space-lg);
        }

        .feature-title {
          font-size: 1.25rem;
          margin-bottom: var(--space-sm);
        }

        .feature-desc {
          color: var(--neutral-400);
          font-size: 0.9rem;
        }

        /* MF cards */
        .mf-card {
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s;
        }

        .mf-card:hover {
          transform: translateX(8px);
        }

        .mf-icon {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-md);
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .mf-name {
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
        }

        .mf-desc {
          color: var(--neutral-500);
          font-size: 0.85rem;
        }

        /* Demo card */
        .demo-card {
          overflow: hidden;
        }

        .demo-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-bottom: 1rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .demo-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .demo-label {
          margin-left: auto;
          font-size: 0.75rem;
          color: var(--neutral-500);
        }

        /* Architecture Diagram */
        .architecture-diagram {
          max-width: 1000px;
          margin: 0 auto;
          font-family: monospace;
          font-size: 0.85rem;
          line-height: 1.4;
          overflow: auto;
        }

        .architecture-diagram pre {
          color: var(--neutral-300);
          margin: 0;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .tech-stack {
            display: none;
          }

          .github-btn .github-count {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
