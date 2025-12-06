import React from 'react';
import DashboardWidget from '../components/DashboardWidget';

export default function DashboardPage() {
  const metrics = [
    { label: 'Total Revenue', value: '$124,592', change: '+12.5%', positive: true, icon: '💰' },
    { label: 'Active Users', value: '8,429', change: '+8.2%', positive: true, icon: '👥' },
    { label: 'Conversion Rate', value: '3.24%', change: '-0.4%', positive: false, icon: '📊' },
    { label: 'Avg. Session', value: '4m 32s', change: '+15.3%', positive: true, icon: '⏱️' },
  ];

  return (
    <div className="dashboard" style={{ padding: '2rem' }}>
      <div className="welcome" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome back! 👋</h2>
        <p style={{ color: '#a1a1aa' }}>Here's what's happening with your platform today.</p>
      </div>

      <div className="metrics" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {metrics.map((metric, index) => (
          <DashboardWidget key={index} {...metric} />
        ))}
      </div>

      <div className="chart-section" style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Revenue Overview</h3>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '1rem',
          height: '150px',
        }}>
          {[65, 80, 45, 90, 70, 85, 95].map((height, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${height}%`,
                background: 'linear-gradient(180deg, #6366f1 0%, #4f46e5 100%)',
                borderRadius: '0.25rem 0.25rem 0 0',
              }}
            />
          ))}
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.5rem',
          color: '#71717a',
          fontSize: '0.75rem',
        }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <span key={i}>{day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
