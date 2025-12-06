import React from 'react';
import AnalyticsChart from '../components/AnalyticsChart';

export default function AnalyticsPage() {
  const kpis = [
    { label: 'Page Views', value: '2.4M', trend: '+18.2%', positive: true },
    { label: 'Unique Visitors', value: '847K', trend: '+12.1%', positive: true },
    { label: 'Bounce Rate', value: '32.4%', trend: '-5.3%', positive: true },
    { label: 'Avg. Duration', value: '4:23', trend: '+8.7%', positive: true },
  ];

  return (
    <div className="analytics" style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Analytics Dashboard</h1>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {kpis.map((kpi, index) => (
          <div key={index} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            textAlign: 'center',
          }}>
            <div style={{ color: '#a1a1aa', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              {kpi.label}
            </div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem',
            }}>
              {kpi.value}
            </div>
            <div style={{
              color: kpi.positive ? '#22c55e' : '#ef4444',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}>
              {kpi.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <AnalyticsChart />
    </div>
  );
}
