import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function BillingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out the platform',
      features: [
        '3 micro frontends',
        '1,000 monthly builds',
        'Community support',
        'Basic analytics',
      ],
      cta: 'Current Plan',
      current: true,
      gradient: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
    },
    {
      name: 'Pro',
      price: '$49',
      period: '/month',
      description: 'For growing teams and projects',
      features: [
        '10 micro frontends',
        '10,000 monthly builds',
        'Priority support',
        'Advanced analytics',
        'Custom domains',
        'Team collaboration',
      ],
      cta: 'Upgrade to Pro',
      popular: true,
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      description: 'For large-scale applications',
      features: [
        'Unlimited micro frontends',
        'Unlimited builds',
        '24/7 dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'SSO & SAML',
        'Audit logs',
      ],
      cta: 'Contact Sales',
      gradient: 'linear-gradient(135deg, #d946ef 0%, #ec4899 100%)',
    },
  ];

  const invoices = [
    { id: 'INV-2024-001', date: 'Dec 1, 2024', amount: '$49.00', status: 'Paid' },
    { id: 'INV-2024-002', date: 'Nov 1, 2024', amount: '$49.00', status: 'Paid' },
    { id: 'INV-2024-003', date: 'Oct 1, 2024', amount: '$49.00', status: 'Paid' },
  ];

  return (
    <>
      <Head>
        <title>Billing | Micro Frontend Platform</title>
      </Head>
      <Layout title="Billing">
        <div className="billing">
          {/* Current Usage */}
          <div className="usage-section mb-xl">
            <h2 className="section-title">Current Usage</h2>
            <div className="grid grid-3">
              <div className="usage-card card">
                <div className="usage-icon">🏗️</div>
                <div className="usage-value">3 / 10</div>
                <div className="usage-label">Micro Frontends</div>
                <div className="usage-bar">
                  <div className="usage-fill" style={{ width: '30%' }} />
                </div>
              </div>
              <div className="usage-card card">
                <div className="usage-icon">⚡</div>
                <div className="usage-value">2,450 / 10,000</div>
                <div className="usage-label">Monthly Builds</div>
                <div className="usage-bar">
                  <div className="usage-fill" style={{ width: '24.5%' }} />
                </div>
              </div>
              <div className="usage-card card">
                <div className="usage-icon">👥</div>
                <div className="usage-value">5 / 20</div>
                <div className="usage-label">Team Members</div>
                <div className="usage-bar">
                  <div className="usage-fill" style={{ width: '25%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="plans-section mb-xl">
            <h2 className="section-title">Plans</h2>
            <div className="plans-grid">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`plan-card card ${plan.popular ? 'popular' : ''} ${plan.current ? 'current' : ''}`}
                >
                  {plan.popular && (
                    <div className="popular-badge">Most Popular</div>
                  )}
                  <div className="plan-header">
                    <h3 className="plan-name">{plan.name}</h3>
                    <div className="plan-price">
                      <span className="price-value">{plan.price}</span>
                      <span className="price-period">{plan.period}</span>
                    </div>
                    <p className="plan-description">{plan.description}</p>
                  </div>
                  <ul className="plan-features">
                    {plan.features.map((feature, i) => (
                      <li key={i}>
                        <span className="feature-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`plan-cta ${plan.current ? 'current' : ''} ${plan.popular ? 'popular' : ''}`}
                    disabled={plan.current}
                    style={{ background: plan.current ? 'transparent' : plan.gradient }}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="payment-section mb-xl">
            <h2 className="section-title">Payment Method</h2>
            <div className="card payment-card">
              <div className="payment-info">
                <div className="card-icon">💳</div>
                <div className="card-details">
                  <div className="card-number">•••• •••• •••• 4242</div>
                  <div className="card-meta">Expires 12/25</div>
                </div>
              </div>
              <button className="btn btn-secondary">Update</button>
            </div>
          </div>

          {/* Billing History */}
          <div className="history-section">
            <h2 className="section-title">Billing History</h2>
            <div className="card">
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="invoice-id">{invoice.id}</td>
                      <td>{invoice.date}</td>
                      <td>{invoice.amount}</td>
                      <td>
                        <span className="status-badge paid">{invoice.status}</span>
                      </td>
                      <td>
                        <button className="download-btn">📥 Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <style jsx>{`
          .billing {
            animation: fadeIn 0.4s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .section-title {
            font-size: 1.25rem;
            margin-bottom: var(--space-lg);
            color: var(--neutral-200);
          }

          .usage-card {
            text-align: center;
          }

          .usage-icon {
            font-size: 2rem;
            margin-bottom: var(--space-md);
          }

          .usage-value {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: var(--space-xs);
          }

          .usage-label {
            color: var(--neutral-400);
            font-size: 0.875rem;
            margin-bottom: var(--space-md);
          }

          .usage-bar {
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: var(--radius-full);
            overflow: hidden;
          }

          .usage-fill {
            height: 100%;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            border-radius: var(--radius-full);
            transition: width 0.6s ease-out;
          }

          .plans-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-lg);
          }

          .plan-card {
            position: relative;
            display: flex;
            flex-direction: column;
          }

          .plan-card.popular {
            border-color: var(--primary-500);
            box-shadow: 0 0 30px rgba(99, 102, 241, 0.2);
          }

          .popular-badge {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            padding: var(--space-xs) var(--space-md);
            border-radius: var(--radius-full);
            font-size: 0.75rem;
            font-weight: 600;
          }

          .plan-header {
            text-align: center;
            padding-bottom: var(--space-lg);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: var(--space-lg);
          }

          .plan-name {
            font-size: 1.25rem;
            margin-bottom: var(--space-md);
          }

          .plan-price {
            margin-bottom: var(--space-sm);
          }

          .price-value {
            font-size: 2.5rem;
            font-weight: 700;
          }

          .price-period {
            color: var(--neutral-400);
          }

          .plan-description {
            color: var(--neutral-400);
            font-size: 0.875rem;
          }

          .plan-features {
            list-style: none;
            flex: 1;
            margin-bottom: var(--space-lg);
          }

          .plan-features li {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            padding: var(--space-sm) 0;
            color: var(--neutral-300);
          }

          .feature-check {
            color: var(--primary-400);
            font-weight: bold;
          }

          .plan-cta {
            width: 100%;
            padding: var(--space-md);
            border: 2px solid transparent;
            border-radius: var(--radius-lg);
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all var(--transition-base);
          }

          .plan-cta.current {
            border-color: var(--neutral-600);
            color: var(--neutral-400);
            cursor: default;
          }

          .plan-cta:not(.current):hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
          }

          .payment-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .payment-info {
            display: flex;
            align-items: center;
            gap: var(--space-lg);
          }

          .card-icon {
            font-size: 2rem;
            width: 60px;
            height: 40px;
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .card-number {
            font-weight: 600;
            font-family: monospace;
            font-size: 1.1rem;
          }

          .card-meta {
            color: var(--neutral-400);
            font-size: 0.875rem;
          }

          .invoice-table {
            width: 100%;
            border-collapse: collapse;
          }

          .invoice-table th,
          .invoice-table td {
            padding: var(--space-md);
            text-align: left;
          }

          .invoice-table th {
            color: var(--neutral-400);
            font-weight: 500;
            font-size: 0.875rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .invoice-table td {
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }

          .invoice-table tr:last-child td {
            border-bottom: none;
          }

          .invoice-id {
            font-family: monospace;
            color: var(--primary-400);
          }

          .status-badge {
            padding: var(--space-xs) var(--space-sm);
            border-radius: var(--radius-full);
            font-size: 0.75rem;
            font-weight: 600;
          }

          .status-badge.paid {
            background: rgba(34, 197, 94, 0.2);
            color: #22c55e;
          }

          .download-btn {
            background: transparent;
            border: none;
            color: var(--neutral-400);
            cursor: pointer;
            font-size: 0.875rem;
            transition: color var(--transition-base);
          }

          .download-btn:hover {
            color: var(--neutral-200);
          }

          @media (max-width: 1024px) {
            .plans-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </Layout>
    </>
  );
}
