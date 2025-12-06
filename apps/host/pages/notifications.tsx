import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: '✅',
      title: 'Deployment Successful',
      message: 'Dashboard v2.1.0 has been deployed to production',
      time: '5 min ago',
      read: false,
    },
    {
      id: 2,
      type: 'warning',
      icon: '⚠️',
      title: 'Build Warning',
      message: 'Analytics module has deprecated dependencies',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'info',
      icon: '📢',
      title: 'New Team Member',
      message: 'Sarah Smith joined the development team',
      time: '2 hours ago',
      read: true,
    },
    {
      id: 4,
      type: 'error',
      icon: '❌',
      title: 'Build Failed',
      message: 'Billing module failed to compile - check logs',
      time: '3 hours ago',
      read: true,
    },
    {
      id: 5,
      type: 'success',
      icon: '🎉',
      title: 'Milestone Reached',
      message: 'Platform reached 1 million monthly active users',
      time: '1 day ago',
      read: true,
    },
    {
      id: 6,
      type: 'info',
      icon: '🔄',
      title: 'Remote Updated',
      message: 'Auth module updated to v1.2.3',
      time: '2 days ago',
      read: true,
    },
  ];

  const filteredNotifications = filter === 'all'
    ? notifications
    : filter === 'unread'
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <Head>
        <title>Notifications | Micro Frontend Platform</title>
      </Head>
      <Layout title="Notifications">
        <div className="notifications">
          {/* Header */}
          <div className="notifications-header mb-xl">
            <div className="header-left">
              <span className="unread-badge">{unreadCount} unread</span>
            </div>
            <div className="header-right">
              <button className="btn btn-secondary">Mark all as read</button>
              <button className="btn btn-secondary">⚙️ Settings</button>
            </div>
          </div>

          {/* Filters */}
          <div className="filters glass mb-xl">
            {['all', 'unread', 'success', 'warning', 'error', 'info'].map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'success' && '✅ '}
                {f === 'warning' && '⚠️ '}
                {f === 'error' && '❌ '}
                {f === 'info' && '📢 '}
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="notification-list">
            {filteredNotifications.length === 0 ? (
              <div className="empty-state card">
                <div className="empty-icon">🔔</div>
                <h3>No notifications</h3>
                <p>You're all caught up!</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item card ${!notification.read ? 'unread' : ''} ${notification.type}`}
                >
                  <div className="notification-icon">{notification.icon}</div>
                  <div className="notification-content">
                    <div className="notification-header">
                      <h4>{notification.title}</h4>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    <p>{notification.message}</p>
                  </div>
                  <div className="notification-actions">
                    {!notification.read && <span className="unread-dot" />}
                    <button className="action-btn">⋮</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Notification Preferences */}
          <div className="preferences-section mt-xl">
            <h2 className="section-title">Notification Preferences</h2>
            <div className="card">
              <div className="preference-grid">
                <div className="preference-category">
                  <h4>Deployments</h4>
                  <div className="preference-options">
                    <label className="preference-toggle">
                      <span>Email</span>
                      <input type="checkbox" defaultChecked />
                    </label>
                    <label className="preference-toggle">
                      <span>Push</span>
                      <input type="checkbox" defaultChecked />
                    </label>
                    <label className="preference-toggle">
                      <span>Slack</span>
                      <input type="checkbox" />
                    </label>
                  </div>
                </div>
                <div className="preference-category">
                  <h4>Build Status</h4>
                  <div className="preference-options">
                    <label className="preference-toggle">
                      <span>Email</span>
                      <input type="checkbox" />
                    </label>
                    <label className="preference-toggle">
                      <span>Push</span>
                      <input type="checkbox" defaultChecked />
                    </label>
                    <label className="preference-toggle">
                      <span>Slack</span>
                      <input type="checkbox" defaultChecked />
                    </label>
                  </div>
                </div>
                <div className="preference-category">
                  <h4>Team Updates</h4>
                  <div className="preference-options">
                    <label className="preference-toggle">
                      <span>Email</span>
                      <input type="checkbox" defaultChecked />
                    </label>
                    <label className="preference-toggle">
                      <span>Push</span>
                      <input type="checkbox" />
                    </label>
                    <label className="preference-toggle">
                      <span>Slack</span>
                      <input type="checkbox" />
                    </label>
                  </div>
                </div>
                <div className="preference-category">
                  <h4>Security Alerts</h4>
                  <div className="preference-options">
                    <label className="preference-toggle">
                      <span>Email</span>
                      <input type="checkbox" defaultChecked />
                    </label>
                    <label className="preference-toggle">
                      <span>Push</span>
                      <input type="checkbox" defaultChecked />
                    </label>
                    <label className="preference-toggle">
                      <span>Slack</span>
                      <input type="checkbox" defaultChecked />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .notifications {
            animation: fadeIn 0.4s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .notifications-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .unread-badge {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            padding: 0.5rem 1rem;
            border-radius: var(--radius-full);
            font-weight: 600;
            font-size: 0.875rem;
          }

          .header-right {
            display: flex;
            gap: var(--space-md);
          }

          .filters {
            display: flex;
            gap: var(--space-sm);
            padding: var(--space-sm);
            border-radius: var(--radius-xl);
            overflow-x: auto;
          }

          .filter-btn {
            padding: var(--space-sm) var(--space-md);
            background: transparent;
            border: none;
            color: var(--neutral-400);
            border-radius: var(--radius-lg);
            cursor: pointer;
            font-weight: 500;
            white-space: nowrap;
            transition: all var(--transition-base);
          }

          .filter-btn:hover {
            background: rgba(255, 255, 255, 0.05);
            color: var(--neutral-200);
          }

          .filter-btn.active {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%);
            color: var(--primary-300);
          }

          .notification-list {
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
          }

          .notification-item {
            display: flex;
            align-items: flex-start;
            gap: var(--space-lg);
            padding: var(--space-lg);
            transition: all var(--transition-base);
          }

          .notification-item.unread {
            background: rgba(99, 102, 241, 0.1);
            border-color: rgba(99, 102, 241, 0.3);
          }

          .notification-icon {
            font-size: 1.5rem;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius-lg);
            background: rgba(255, 255, 255, 0.05);
          }

          .notification-item.success .notification-icon {
            background: rgba(34, 197, 94, 0.2);
          }

          .notification-item.warning .notification-icon {
            background: rgba(251, 191, 36, 0.2);
          }

          .notification-item.error .notification-icon {
            background: rgba(239, 68, 68, 0.2);
          }

          .notification-item.info .notification-icon {
            background: rgba(99, 102, 241, 0.2);
          }

          .notification-content {
            flex: 1;
          }

          .notification-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--space-xs);
          }

          .notification-header h4 {
            font-size: 1rem;
          }

          .notification-time {
            color: var(--neutral-500);
            font-size: 0.75rem;
          }

          .notification-content p {
            color: var(--neutral-400);
            font-size: 0.9rem;
          }

          .notification-actions {
            display: flex;
            align-items: center;
            gap: var(--space-md);
          }

          .unread-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--primary-500);
          }

          .action-btn {
            background: transparent;
            border: none;
            color: var(--neutral-400);
            cursor: pointer;
            font-size: 1.25rem;
            padding: 0.25rem;
          }

          .empty-state {
            text-align: center;
            padding: var(--space-3xl);
          }

          .empty-icon {
            font-size: 3rem;
            margin-bottom: var(--space-lg);
          }

          .empty-state h3 {
            margin-bottom: var(--space-sm);
          }

          .empty-state p {
            color: var(--neutral-500);
          }

          .section-title {
            font-size: 1.25rem;
            margin-bottom: var(--space-lg);
          }

          .preference-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-xl);
          }

          .preference-category h4 {
            margin-bottom: var(--space-md);
            font-size: 1rem;
          }

          .preference-options {
            display: flex;
            gap: var(--space-lg);
          }

          .preference-toggle {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            color: var(--neutral-400);
            font-size: 0.875rem;
            cursor: pointer;
          }

          .preference-toggle input {
            width: 16px;
            height: 16px;
            accent-color: var(--primary-500);
          }

          @media (max-width: 768px) {
            .preference-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </Layout>
    </>
  );
}
