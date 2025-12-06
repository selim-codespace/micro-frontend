import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

// Note: In production with Module Federation enabled, this would import from the analytics remote
// For now, we use the local FallbackAnalytics component


function LoadingState() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading Analytics...</p>
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

function FallbackAnalytics() {
  const kpis = [
    { label: 'Page Views', value: '2.4M', trend: '+18.2%', positive: true },
    { label: 'Unique Visitors', value: '847K', trend: '+12.1%', positive: true },
    { label: 'Bounce Rate', value: '32.4%', trend: '-5.3%', positive: true },
    { label: 'Avg. Duration', value: '4:23', trend: '+8.7%', positive: true },
  ];

  const topPages = [
    { page: '/dashboard', views: '45,234', percentage: 28 },
    { page: '/analytics', views: '32,156', percentage: 20 },
    { page: '/billing', views: '28,901', percentage: 18 },
    { page: '/settings', views: '21,456', percentage: 13 },
    { page: '/profile', views: '18,234', percentage: 11 },
  ];

  const countries = [
    { name: 'United States', visits: '234,567', flag: '🇺🇸', percentage: 35 },
    { name: 'United Kingdom', visits: '156,789', flag: '🇬🇧', percentage: 23 },
    { name: 'Germany', visits: '98,456', flag: '🇩🇪', percentage: 15 },
    { name: 'France', visits: '67,890', flag: '🇫🇷', percentage: 10 },
    { name: 'Canada', visits: '54,321', flag: '🇨🇦', percentage: 8 },
  ];

  return (
    <div className="analytics">
      {/* Date Range Selector */}
      <div className="date-range glass mb-xl">
        <span className="date-label">📅 Date Range:</span>
        <div className="date-buttons">
          <button className="date-btn">Today</button>
          <button className="date-btn active">Last 7 days</button>
          <button className="date-btn">Last 30 days</button>
          <button className="date-btn">Last 90 days</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-4 mb-xl">
        {kpis.map((kpi, index) => (
          <div key={index} className="kpi-card card">
            <div className="kpi-label">{kpi.label}</div>
            <div className="kpi-value">{kpi.value}</div>
            <div className={`kpi-trend ${kpi.positive ? 'positive' : 'negative'}`}>
              {kpi.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-2 mb-xl">
        {/* Line Chart */}
        <div className="card">
          <h3 className="card-title">Visitors Over Time</h3>
          <div className="line-chart">
            <svg viewBox="0 0 400 150" className="chart-svg">
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
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                className="line-path"
              />

              {/* Area fill */}
              <path
                d="M0,120 C30,100 50,110 80,80 C110,50 140,60 170,40 C200,20 230,35 260,25 C290,15 320,30 350,20 C380,10 400,15 400,10 L400,150 L0,150 Z"
                fill="url(#areaGradient)"
                className="area-fill"
              />

              {/* Gradient definitions */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(99, 102, 241, 0.3)" />
                  <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="chart-x-labels">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <span key={i}>{day}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="card">
          <h3 className="card-title">Device Distribution</h3>
          <div className="donut-chart">
            <div className="donut">
              <svg viewBox="0 0 100 100" className="donut-svg">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="12"
                  strokeDasharray="125.6 251.2"
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="12"
                  strokeDasharray="75.4 251.2"
                  strokeDashoffset="-125.6"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#d946ef"
                  strokeWidth="12"
                  strokeDasharray="50.2 251.2"
                  strokeDashoffset="-201"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="donut-center">
                <span className="donut-value">100%</span>
                <span className="donut-label">Total</span>
              </div>
            </div>
            <div className="donut-legend">
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#6366f1' }} />
                <span>Desktop</span>
                <span className="legend-value">50%</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#8b5cf6' }} />
                <span>Mobile</span>
                <span className="legend-value">30%</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#d946ef' }} />
                <span>Tablet</span>
                <span className="legend-value">20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-2">
        {/* Top Pages */}
        <div className="card">
          <h3 className="card-title">Top Pages</h3>
          <div className="table">
            {topPages.map((page, index) => (
              <div key={index} className="table-row">
                <span className="table-rank">{index + 1}</span>
                <span className="table-page">{page.page}</span>
                <span className="table-views">{page.views}</span>
                <div className="table-bar">
                  <div
                    className="table-bar-fill"
                    style={{ width: `${page.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="card">
          <h3 className="card-title">Top Countries</h3>
          <div className="table">
            {countries.map((country, index) => (
              <div key={index} className="table-row">
                <span className="table-rank">{country.flag}</span>
                <span className="table-page">{country.name}</span>
                <span className="table-views">{country.visits}</span>
                <div className="table-bar">
                  <div
                    className="table-bar-fill"
                    style={{ width: `${country.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .analytics {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .date-range {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
          padding: var(--space-md) var(--space-lg);
          border-radius: var(--radius-xl);
        }

        .date-label {
          color: var(--neutral-400);
          font-weight: 500;
        }

        .date-buttons {
          display: flex;
          gap: var(--space-sm);
        }

        .date-btn {
          padding: var(--space-sm) var(--space-md);
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          color: var(--neutral-400);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .date-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--neutral-200);
        }

        .date-btn.active {
          background: var(--primary-500);
          border-color: var(--primary-500);
          color: white;
        }

        .kpi-card {
          text-align: center;
        }

        .kpi-label {
          color: var(--neutral-400);
          font-size: 0.875rem;
          margin-bottom: var(--space-sm);
        }

        .kpi-value {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: var(--space-sm);
        }

        .kpi-trend {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .kpi-trend.positive {
          color: #22c55e;
        }

        .kpi-trend.negative {
          color: #ef4444;
        }

        .card-title {
          font-size: 1.1rem;
          margin-bottom: var(--space-lg);
          color: var(--neutral-200);
        }

        .line-chart {
          height: 180px;
        }

        .chart-svg {
          width: 100%;
          height: 150px;
        }

        .line-path {
          animation: drawLine 1.5s ease-out forwards;
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
        }

        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }

        .area-fill {
          opacity: 0;
          animation: fadeIn 0.5s ease-out 1s forwards;
        }

        .chart-x-labels {
          display: flex;
          justify-content: space-between;
          color: var(--neutral-500);
          font-size: 0.75rem;
          margin-top: var(--space-sm);
        }

        .donut-chart {
          display: flex;
          align-items: center;
          gap: var(--space-xl);
        }

        .donut {
          position: relative;
          width: 150px;
          height: 150px;
        }

        .donut-svg {
          width: 100%;
          height: 100%;
        }

        .donut-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .donut-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .donut-label {
          color: var(--neutral-500);
          font-size: 0.75rem;
        }

        .donut-legend {
          flex: 1;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) 0;
        }

        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .legend-value {
          margin-left: auto;
          font-weight: 600;
        }

        .table {
          display: flex;
          flex-direction: column;
        }

        .table-row {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md) 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .table-rank {
          width: 30px;
          color: var(--neutral-500);
          font-weight: 600;
        }

        .table-page {
          flex: 1;
          color: var(--neutral-200);
        }

        .table-views {
          color: var(--neutral-400);
          font-size: 0.875rem;
        }

        .table-bar {
          width: 100px;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .table-bar-fill {
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: var(--radius-full);
        }
      `}</style>
    </div>
  );
}

export default function Analytics() {
  return (
    <>
      <Head>
        <title>Analytics | Micro Frontend Platform</title>
      </Head>
      <Layout title="Analytics">
        <FallbackAnalytics />
      </Layout>
    </>
  );
}
