import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

// Note: In production with Module Federation enabled, this would import from the dashboard remote
// For now, we use the local FallbackDashboard component

function LoadingState() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading Dashboard...</p>
      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          color: var(--neutral-400);
        }
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(99, 102, 241, 0.2);
          border-top-color: var(--primary-500);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-bottom: 1rem;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function FallbackDashboard() {
  // Dashboard metrics data
  const metrics = [
    { label: 'Total Revenue', value: '$124,592', change: '+12.5%', positive: true, icon: '💰' },
    { label: 'Active Users', value: '8,429', change: '+8.2%', positive: true, icon: '👥' },
    { label: 'Conversion Rate', value: '3.24%', change: '-0.4%', positive: false, icon: '📊' },
    { label: 'Avg. Session', value: '4m 32s', change: '+15.3%', positive: true, icon: '⏱️' },
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Created new project', time: '2 min ago', avatar: '👨‍💼' },
    { user: 'Sarah Smith', action: 'Updated billing info', time: '15 min ago', avatar: '👩‍💻' },
    { user: 'Mike Johnson', action: 'Deployed to production', time: '1 hour ago', avatar: '👨‍🔧' },
    { user: 'Emily Brown', action: 'Added team member', time: '3 hours ago', avatar: '👩‍🎨' },
  ];

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="welcome-section glass mb-xl">
        <div className="welcome-content">
          <h2>Welcome back! 👋</h2>
          <p>Here's what's happening with your platform today.</p>
        </div>
        <div className="welcome-actions">
          <button className="btn btn-primary">Create New</button>
          <button className="btn btn-secondary">View Reports</button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-4 mb-xl">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card card">
            <div className="metric-header">
              <span className="metric-icon">{metric.icon}</span>
              <span className={`metric-change ${metric.positive ? 'positive' : 'negative'}`}>
                {metric.change}
              </span>
            </div>
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-2 mb-xl">
        <div className="card">
          <h3 className="card-title">Revenue Overview</h3>
          <div className="chart-placeholder">
            <div className="chart-bars">
              {[65, 80, 45, 90, 70, 85, 95].map((height, i) => (
                <div
                  key={i}
                  className="chart-bar"
                  style={{
                    height: `${height}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
            <div className="chart-labels">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <span key={i}>{day}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Traffic Sources</h3>
          <div className="traffic-sources">
            {[
              { source: 'Direct', percentage: 45, color: '#6366f1' },
              { source: 'Organic Search', percentage: 30, color: '#8b5cf6' },
              { source: 'Social Media', percentage: 15, color: '#d946ef' },
              { source: 'Referral', percentage: 10, color: '#ec4899' },
            ].map((item, i) => (
              <div key={i} className="traffic-item">
                <div className="traffic-info">
                  <span className="traffic-dot" style={{ background: item.color }} />
                  <span className="traffic-name">{item.source}</span>
                  <span className="traffic-value">{item.percentage}%</span>
                </div>
                <div className="traffic-bar">
                  <div
                    className="traffic-fill"
                    style={{
                      width: `${item.percentage}%`,
                      background: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="card">
        <h3 className="card-title">Recent Activity</h3>
        <div className="activity-list">
          {recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <span className="activity-avatar">{activity.avatar}</span>
              <div className="activity-content">
                <span className="activity-user">{activity.user}</span>
                <span className="activity-action">{activity.action}</span>
              </div>
              <span className="activity-time">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .welcome-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-xl);
          border-radius: var(--radius-xl);
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%);
        }

        .welcome-content h2 {
          font-size: 1.5rem;
          margin-bottom: var(--space-sm);
        }

        .welcome-content p {
          color: var(--neutral-400);
        }

        .welcome-actions {
          display: flex;
          gap: var(--space-md);
        }

        .metric-card {
          position: relative;
          overflow: hidden;
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-md);
        }

        .metric-icon {
          font-size: 1.5rem;
        }

        .metric-change {
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .metric-change.positive {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .metric-change.negative {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .metric-value {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: var(--space-xs);
        }

        .metric-label {
          color: var(--neutral-500);
          font-size: 0.875rem;
        }

        .card-title {
          font-size: 1.1rem;
          margin-bottom: var(--space-lg);
          color: var(--neutral-200);
        }

        .chart-placeholder {
          height: 200px;
          display: flex;
          flex-direction: column;
        }

        .chart-bars {
          flex: 1;
          display: flex;
          align-items: flex-end;
          gap: var(--space-md);
          padding-bottom: var(--space-md);
        }

        .chart-bar {
          flex: 1;
          background: linear-gradient(180deg, var(--primary-400) 0%, var(--primary-600) 100%);
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
          animation: growUp 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes growUp {
          from {
            transform: scaleY(0);
            opacity: 0;
          }
          to {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        .chart-labels {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: var(--space-sm);
        }

        .chart-labels span {
          color: var(--neutral-500);
          font-size: 0.75rem;
        }

        .traffic-sources {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .traffic-item {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .traffic-info {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }

        .traffic-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .traffic-name {
          flex: 1;
          color: var(--neutral-300);
        }

        .traffic-value {
          font-weight: 600;
          color: var(--neutral-200);
        }

        .traffic-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .traffic-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.6s ease-out;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md) 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .activity-content {
          flex: 1;
        }

        .activity-user {
          font-weight: 600;
          margin-right: var(--space-sm);
        }

        .activity-action {
          color: var(--neutral-400);
        }

        .activity-time {
          color: var(--neutral-500);
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | Micro Frontend Platform</title>
      </Head>
      <Layout title="Dashboard">
        <FallbackDashboard />
      </Layout>
    </>
  );
}
