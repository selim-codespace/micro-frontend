import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Note: In production with Module Federation enabled, AuthLoginForm would be imported from auth remote
// For now, we use a local placeholder to demonstrate the architecture

// Placeholder component for when remote fails to load
const PlaceholderComponent: React.FC<{ name: string }> = ({ name }) => (
  <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔌</div>
    <p style={{ color: 'var(--neutral-400)' }}>{name} Micro Frontend</p>
    <small style={{ color: 'var(--neutral-500)' }}>Connect to load component</small>
  </div>
);

// Loading component
const LoadingComponent: React.FC<{ name: string }> = ({ name }) => (
  <div className="card animate-pulse-glow" style={{ textAlign: 'center', padding: '2rem' }}>
    <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
    <p style={{ color: 'var(--neutral-400)' }}>Loading {name}...</p>
  </div>
);

// Placeholder auth form that demonstrates where remote component would load
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
  { value: '7', label: 'Micro Frontends', suffix: '' },
  { value: '6', label: 'Shared Packages', suffix: '' },
  { value: '56', label: 'Unit Tests', suffix: '+' },
  { value: '100', label: 'TypeScript', suffix: '%' },
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

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Micro Frontend Platform | Enterprise-Grade Architecture</title>
        <meta name="description" content="A modular, enterprise-grade Micro Frontend Platform built using Next.js 15+, Module Federation, TypeScript, and Turborepo" />
      </Head>

      {/* Navigation */}
      <nav className="glass fixed w-full z-50" style={{ padding: 'var(--space-md) 0' }}>
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center gap-sm" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '1.5rem' }}>🌐</span>
            <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>MicroFE Platform</span>
          </Link>
          <div className="flex gap-lg items-center">
            <Link href="/dashboard" style={{ color: 'var(--neutral-300)', fontWeight: 500 }}>Dashboard</Link>
            <Link href="/docs" style={{ color: 'var(--neutral-300)', fontWeight: 500 }}>Docs</Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: 'var(--space-sm) var(--space-md)', fontSize: '0.875rem' }}
            >
              ⭐ GitHub
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center relative overflow-hidden" style={{ paddingTop: '6rem' }}>
          <div className="container">
            <div className="text-center" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div className="animate-slide-up">
                <span className="badge mb-lg">🚀 Enterprise-Grade Architecture</span>
              </div>

              <h1 className="animate-slide-up delay-1 mb-lg">
                <span className="gradient-text">Micro Frontend</span>
                <br />
                Platform
              </h1>

              <p className="animate-slide-up delay-2" style={{
                fontSize: '1.25rem',
                color: 'var(--neutral-400)',
                maxWidth: '700px',
                margin: '0 auto var(--space-xl)'
              }}>
                A modular, scalable architecture demonstrating enterprise patterns used by
                <strong style={{ color: 'var(--neutral-200)' }}> AWS, Shopify, Uber, and Atlassian</strong>.
                Built with Next.js, Module Federation, TypeScript, and Turborepo.
              </p>

              <div className="animate-slide-up delay-3 flex gap-md justify-center">
                <Link href="/dashboard" className="btn btn-primary">
                  Explore Platform →
                </Link>
                <Link href="/auth" className="btn btn-secondary">
                  Try Demo
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-4 mt-3xl animate-fade-in delay-4">
              {stats.map((stat, index) => (
                <div key={index} className="card text-center">
                  <div style={{ fontSize: '3rem', fontWeight: 800 }} className="gradient-text">
                    {stat.value}{stat.suffix}
                  </div>
                  <p style={{ color: 'var(--neutral-400)', marginTop: 'var(--space-sm)' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating decoration */}
          <div className="animate-float absolute" style={{
            top: '20%',
            right: '10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }} />
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
                <div key={index} className="card" style={{ '--hover-glow': feature.gradient } as React.CSSProperties}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: 'var(--radius-lg)',
                    background: feature.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    marginBottom: 'var(--space-lg)',
                  }}>
                    {feature.icon}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-sm)' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--neutral-400)', fontSize: '0.9rem' }}>{feature.description}</p>
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
                  className="card flex items-center gap-lg"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: 'var(--radius-md)',
                    background: `linear-gradient(135deg, ${mf.color}40 0%, ${mf.color}20 100%)`,
                    border: `1px solid ${mf.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}>
                    {mf.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{mf.name}</h4>
                    <p style={{ color: 'var(--neutral-500)', fontSize: '0.85rem' }}>{mf.desc}</p>
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

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div className="flex items-center gap-sm mb-lg">
                <span style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#f43f5e'
                }} />
                <span style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#fbbf24'
                }} />
                <span style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#22c55e'
                }} />
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '0.75rem',
                  color: 'var(--neutral-500)'
                }}>
                  auth/LoginForm
                </span>
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

            <div className="card" style={{
              maxWidth: '1000px',
              margin: '0 auto',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              lineHeight: '1.4',
              overflow: 'auto',
            }}>
              <pre style={{ color: 'var(--neutral-300)' }}>
                {`
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
     │  • Sessions  │ │  • Stats     │ │  • KPIs      │
     └──────────────┘ └──────────────┘ └──────────────┘
              │               │               │
              └───────────────┼───────────────┘
                              │
     ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
     │   BILLING    │ │    ADMIN     │ │NOTIFICATIONS │
     │  ──────────  │ │  ──────────  │ │  ──────────  │
     │  • Payments  │ │  • Users     │ │  • Alerts    │
     │  • Plans     │ │  • Settings  │ │  • Messages  │
     │  • Invoices  │ │  • Roles     │ │  • Events    │
     └──────────────┘ └──────────────┘ └──────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
     ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
     │   UI-KIT     │ │ SHARED-STATE │ │  API-CLIENT  │
     │  ──────────  │ │  ──────────  │ │  ──────────  │
     │  Components  │ │  Zustand     │ │  Axios       │
     │  Themes      │ │  Events      │ │  Types       │
     └──────────────┘ └──────────────┘ └──────────────┘
`}
              </pre>
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
              <Link href="/dashboard" className="btn btn-primary">
                Open Dashboard →
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                View Source
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
            <a href="/docs" style={{ color: 'var(--neutral-400)' }}>Documentation</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .spinner {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(255,255,255,0.1);
          border-top-color: var(--primary-400);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
