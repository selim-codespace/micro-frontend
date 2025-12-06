import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('users');

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: '👨‍💼' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'Developer', status: 'Active', avatar: '👩‍💻' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Developer', status: 'Active', avatar: '👨‍🔧' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Designer', status: 'Inactive', avatar: '👩‍🎨' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', role: 'Developer', status: 'Active', avatar: '👨‍💻' },
  ];

  const remotes = [
    { name: 'auth', url: 'https://auth.example.com', status: 'online', version: '1.2.3', lastDeploy: '2 hours ago' },
    { name: 'dashboard', url: 'https://dashboard.example.com', status: 'online', version: '2.1.0', lastDeploy: '1 day ago' },
    { name: 'analytics', url: 'https://analytics.example.com', status: 'online', version: '1.8.5', lastDeploy: '3 hours ago' },
    { name: 'billing', url: 'https://billing.example.com', status: 'offline', version: '1.5.2', lastDeploy: '5 days ago' },
    { name: 'notifications', url: 'https://notifications.example.com', status: 'online', version: '1.0.1', lastDeploy: '12 hours ago' },
  ];

  const settings = [
    { name: 'Enable Module Federation', description: 'Allow dynamic loading of remote modules', enabled: true },
    { name: 'SSR for Remotes', description: 'Enable server-side rendering for micro frontends', enabled: false },
    { name: 'Cache Remote Entries', description: 'Cache remote entry files for faster loading', enabled: true },
    { name: 'Debug Mode', description: 'Show debug information in console', enabled: false },
    { name: 'Version Lock', description: 'Lock remote versions to prevent auto-updates', enabled: true },
  ];

  return (
    <>
      <Head>
        <title>Admin | Micro Frontend Platform</title>
      </Head>
      <Layout title="Admin Panel">
        <div className="admin">
          {/* Tabs */}
          <div className="tabs glass mb-xl">
            {['users', 'remotes', 'settings'].map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'users' && '👥'}
                {tab === 'remotes' && '🔌'}
                {tab === 'settings' && '⚙️'}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="users-section animate-fade-in">
              <div className="section-header">
                <h2>Team Members</h2>
                <button className="btn btn-primary">+ Add User</button>
              </div>
              <div className="card">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-cell">
                            <span className="user-avatar">{user.avatar}</span>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td className="email-cell">{user.email}</td>
                        <td>
                          <span className={`role-badge ${user.role.toLowerCase()}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${user.status.toLowerCase()}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-btn">✏️</button>
                            <button className="action-btn danger">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Remotes Tab */}
          {activeTab === 'remotes' && (
            <div className="remotes-section animate-fade-in">
              <div className="section-header">
                <h2>Remote Modules</h2>
                <button className="btn btn-primary">+ Register Remote</button>
              </div>
              <div className="grid grid-2">
                {remotes.map((remote) => (
                  <div key={remote.name} className="card remote-card">
                    <div className="remote-header">
                      <div className="remote-info">
                        <span className={`status-dot ${remote.status}`} />
                        <h3>{remote.name}</h3>
                        <span className="version-badge">v{remote.version}</span>
                      </div>
                      <div className="remote-actions">
                        <button className="action-btn">🔄</button>
                        <button className="action-btn">⚙️</button>
                      </div>
                    </div>
                    <div className="remote-url">{remote.url}</div>
                    <div className="remote-footer">
                      <span className="deploy-time">Last deploy: {remote.lastDeploy}</span>
                      <button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                        View Logs
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="settings-section animate-fade-in">
              <div className="section-header">
                <h2>Platform Settings</h2>
              </div>
              <div className="card">
                {settings.map((setting, index) => (
                  <div key={index} className="setting-item">
                    <div className="setting-info">
                      <h4>{setting.name}</h4>
                      <p>{setting.description}</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked={setting.enabled} />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                ))}
              </div>

              <h2 className="mt-xl mb-lg">Danger Zone</h2>
              <div className="card danger-zone">
                <div className="danger-item">
                  <div className="danger-info">
                    <h4>Clear Cache</h4>
                    <p>Clear all cached remote entries and rebuild</p>
                  </div>
                  <button className="btn btn-secondary">Clear Cache</button>
                </div>
                <div className="danger-item">
                  <div className="danger-info">
                    <h4>Reset Platform</h4>
                    <p>Reset all settings to default values</p>
                  </div>
                  <button className="btn danger-btn">Reset</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          .admin {
            animation: fadeIn 0.4s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .tabs {
            display: flex;
            gap: var(--space-sm);
            padding: var(--space-sm);
            border-radius: var(--radius-xl);
            width: fit-content;
          }

          .tab {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            padding: var(--space-md) var(--space-lg);
            background: transparent;
            border: none;
            color: var(--neutral-400);
            border-radius: var(--radius-lg);
            cursor: pointer;
            font-weight: 500;
            transition: all var(--transition-base);
          }

          .tab:hover {
            background: rgba(255, 255, 255, 0.05);
            color: var(--neutral-200);
          }

          .tab.active {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%);
            color: var(--primary-300);
          }

          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--space-lg);
          }

          .section-header h2 {
            font-size: 1.25rem;
          }

          .data-table {
            width: 100%;
            border-collapse: collapse;
          }

          .data-table th,
          .data-table td {
            padding: var(--space-md);
            text-align: left;
          }

          .data-table th {
            color: var(--neutral-400);
            font-weight: 500;
            font-size: 0.875rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .data-table td {
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }

          .data-table tr:last-child td {
            border-bottom: none;
          }

          .user-cell {
            display: flex;
            align-items: center;
            gap: var(--space-md);
          }

          .user-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
          }

          .email-cell {
            color: var(--neutral-400);
          }

          .role-badge {
            padding: 0.25rem 0.75rem;
            border-radius: var(--radius-full);
            font-size: 0.75rem;
            font-weight: 600;
          }

          .role-badge.admin {
            background: rgba(99, 102, 241, 0.2);
            color: #818cf8;
          }

          .role-badge.developer {
            background: rgba(34, 197, 94, 0.2);
            color: #22c55e;
          }

          .role-badge.designer {
            background: rgba(236, 72, 153, 0.2);
            color: #ec4899;
          }

          .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: var(--radius-full);
            font-size: 0.75rem;
            font-weight: 600;
          }

          .status-badge.active {
            background: rgba(34, 197, 94, 0.2);
            color: #22c55e;
          }

          .status-badge.inactive {
            background: rgba(239, 68, 68, 0.2);
            color: #ef4444;
          }

          .action-buttons {
            display: flex;
            gap: var(--space-sm);
          }

          .action-btn {
            background: rgba(255, 255, 255, 0.05);
            border: none;
            padding: 0.5rem;
            border-radius: var(--radius-md);
            cursor: pointer;
            transition: all var(--transition-base);
          }

          .action-btn:hover {
            background: rgba(255, 255, 255, 0.1);
          }

          .action-btn.danger:hover {
            background: rgba(239, 68, 68, 0.2);
          }

          .remote-card {
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
          }

          .remote-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .remote-info {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
          }

          .status-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
          }

          .status-dot.online {
            background: #22c55e;
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
          }

          .status-dot.offline {
            background: #ef4444;
          }

          .remote-info h3 {
            font-size: 1.1rem;
          }

          .version-badge {
            padding: 0.125rem 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: var(--radius-sm);
            font-size: 0.75rem;
            color: var(--neutral-400);
            font-family: monospace;
          }

          .remote-url {
            color: var(--neutral-500);
            font-size: 0.875rem;
            font-family: monospace;
            padding: var(--space-sm) var(--space-md);
            background: rgba(0, 0, 0, 0.2);
            border-radius: var(--radius-md);
          }

          .remote-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .deploy-time {
            color: var(--neutral-500);
            font-size: 0.75rem;
          }

          .setting-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--space-lg) 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }

          .setting-item:last-child {
            border-bottom: none;
          }

          .setting-info h4 {
            font-size: 1rem;
            margin-bottom: var(--space-xs);
          }

          .setting-info p {
            color: var(--neutral-500);
            font-size: 0.875rem;
          }

          .toggle {
            position: relative;
            width: 50px;
            height: 28px;
            cursor: pointer;
          }

          .toggle input {
            opacity: 0;
            width: 0;
            height: 0;
          }

          .toggle-slider {
            position: absolute;
            inset: 0;
            background: var(--neutral-700);
            border-radius: var(--radius-full);
            transition: background var(--transition-base);
          }

          .toggle-slider::before {
            content: '';
            position: absolute;
            width: 22px;
            height: 22px;
            left: 3px;
            top: 3px;
            background: white;
            border-radius: 50%;
            transition: transform var(--transition-base);
          }

          .toggle input:checked + .toggle-slider {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          }

          .toggle input:checked + .toggle-slider::before {
            transform: translateX(22px);
          }

          .danger-zone {
            border: 1px solid rgba(239, 68, 68, 0.3);
          }

          .danger-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--space-lg) 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }

          .danger-item:last-child {
            border-bottom: none;
          }

          .danger-info h4 {
            font-size: 1rem;
            margin-bottom: var(--space-xs);
          }

          .danger-info p {
            color: var(--neutral-500);
            font-size: 0.875rem;
          }

          .danger-btn {
            background: rgba(239, 68, 68, 0.2);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #ef4444;
            padding: var(--space-sm) var(--space-lg);
            border-radius: var(--radius-lg);
            cursor: pointer;
            font-weight: 600;
            transition: all var(--transition-base);
          }

          .danger-btn:hover {
            background: rgba(239, 68, 68, 0.3);
          }

          .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </Layout>
    </>
  );
}
