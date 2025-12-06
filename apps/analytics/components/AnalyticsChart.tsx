import React from 'react';

export default function AnalyticsChart() {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '1rem',
      padding: '1.5rem',
    }}>
      <h3 style={{ marginBottom: '1.5rem' }}>Visitors Over Time</h3>

      <div style={{ height: '180px' }}>
        <svg viewBox="0 0 400 150" style={{ width: '100%', height: '150px' }}>
          {/* Grid lines */}
          {[0, 37.5, 75, 112.5, 150].map((y, i) => (
            <line
              key={i}
              x1="0"
              y1={y}
              x2="400"
              y2={y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}

          {/* Main line */}
          <path
            d="M0,120 C30,100 50,110 80,80 C110,50 140,60 170,40 C200,20 230,35 260,25 C290,15 320,30 350,20 C380,10 400,15 400,10"
            fill="none"
            stroke="url(#analyticsGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Area fill */}
          <path
            d="M0,120 C30,100 50,110 80,80 C110,50 140,60 170,40 C200,20 230,35 260,25 C290,15 320,30 350,20 C380,10 400,15 400,10 L400,150 L0,150 Z"
            fill="url(#areaFill)"
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="analyticsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="areaFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.3)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
            </linearGradient>
          </defs>
        </svg>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '#71717a',
          fontSize: '0.75rem',
          marginTop: '0.5rem',
        }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <span key={i}>{day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
