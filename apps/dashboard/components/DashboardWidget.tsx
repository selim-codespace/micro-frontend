import React from 'react';

interface DashboardWidgetProps {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
}

export default function DashboardWidget({ label, value, change, positive, icon }: DashboardWidgetProps) {
  return (
    <div className="widget" style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '1rem',
      padding: '1.5rem',
      transition: 'all 0.2s',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
      }}>
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        <span style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 600,
          background: positive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          color: positive ? '#22c55e' : '#ef4444',
        }}>
          {change}
        </span>
      </div>
      <div style={{
        fontSize: '2rem',
        fontWeight: 700,
        marginBottom: '0.25rem',
      }}>
        {value}
      </div>
      <div style={{
        color: '#71717a',
        fontSize: '0.875rem',
      }}>
        {label}
      </div>
    </div>
  );
}
