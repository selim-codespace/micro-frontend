import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const navItems = [
  { name: 'Home', path: '/', icon: '🏠' },
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'Analytics', path: '/analytics', icon: '📈' },
  { name: 'Billing', path: '/billing', icon: '💳' },
  { name: 'Admin', path: '/admin', icon: '⚙️' },
  { name: 'Notifications', path: '/notifications', icon: '🔔' },
];

export default function Layout({ children, title }: LayoutProps) {
  const router = useRouter();

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar glass-dark">
        <div className="sidebar-header">
          <Link href="/" className="logo">
            <span className="logo-icon">🌐</span>
            <span className="logo-text">MicroFE</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`nav-item ${router.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link href="/auth" className="user-menu glass">
            <span className="user-avatar">👤</span>
            <div className="user-info">
              <span className="user-name">Guest User</span>
              <span className="user-role">Sign in</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {title && (
          <header className="page-header">
            <h1 className="gradient-text">{title}</h1>
          </header>
        )}
        <div className="content-wrapper">
          {children}
        </div>
      </main>

      <style jsx>{`
        .layout {
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          width: 260px;
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 100;
        }

        .sidebar-header {
          padding-bottom: var(--space-lg);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: var(--space-lg);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          text-decoration: none;
          color: inherit;
        }

        .logo-icon {
          font-size: 1.75rem;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md);
          border-radius: var(--radius-lg);
          text-decoration: none;
          color: var(--neutral-400);
          font-weight: 500;
          transition: all var(--transition-base);
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--neutral-100);
        }

        .nav-item.active {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%);
          color: var(--primary-300);
          border: 1px solid rgba(99, 102, 241, 0.3);
        }

        .nav-icon {
          font-size: 1.25rem;
        }

        .sidebar-footer {
          padding-top: var(--space-lg);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md);
          border-radius: var(--radius-lg);
          text-decoration: none;
          color: inherit;
          transition: all var(--transition-base);
        }

        .user-menu:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .user-role {
          color: var(--neutral-500);
          font-size: 0.75rem;
        }

        .main-content {
          flex: 1;
          margin-left: 260px;
          padding: var(--space-xl);
        }

        .page-header {
          margin-bottom: var(--space-xl);
        }

        .page-header h1 {
          font-size: 2rem;
        }

        .content-wrapper {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .sidebar {
            width: 80px;
            padding: var(--space-md);
          }

          .logo-text,
          .nav-text,
          .user-info {
            display: none;
          }

          .main-content {
            margin-left: 80px;
          }

          .nav-item {
            justify-content: center;
            padding: var(--space-md);
          }

          .user-menu {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
