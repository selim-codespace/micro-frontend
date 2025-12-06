'use client';

// @ts-expect-error - Workspace alias resolution
import { Card, Button } from '@ui-kit';
// @ts-expect-error - Workspace alias resolution
import { appStateManager } from '@shared-state';

import React, { useState, useEffect } from 'react';

interface User {
  name: string;
  // Add other user properties as needed
}

interface Invoice {
  id: number;
  date: string;
  amount: number;
  status: string;
}

interface BillingData {
  currentPlan: string;
  nextBillingDate: string;
  amount: number;
  paymentMethod: string;
  invoices: Invoice[];
}

export default function BillingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [billingData, setBillingData] = useState<BillingData | null>(null);

  useEffect(() => {
    // Subscribe to state changes
    const unsubscribe = appStateManager.subscribe((state) => {
      setUser(state.user);
    });

    // Initialize state
    const initialState = appStateManager.getState();
    setUser(initialState.user);

    // Simulate fetching billing data
    setTimeout(() => {
      setBillingData({
        currentPlan: 'Pro Plan',
        nextBillingDate: '2025-12-31',
        amount: 99.99,
        paymentMethod: 'Visa ending in 1234',
        invoices: [
          { id: 1, date: '2025-11-01', amount: 99.99, status: 'Paid' },
          { id: 2, date: '2025-10-01', amount: 99.99, status: 'Paid' },
          { id: 3, date: '2025-09-01', amount: 99.99, status: 'Paid' },
        ],
      });
    }, 1000);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Billing Information</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}! Here's your billing information:</p>
          {billingData ? (
            <div>
              <Card title="Current Plan">
                <p>Plan: {billingData.currentPlan}</p>
                <p>Next billing date: {billingData.nextBillingDate}</p>
                <p>Amount: ${billingData.amount.toFixed(2)}</p>
                <p>Payment method: {billingData.paymentMethod}</p>
                <Button variant="primary">Update Payment Method</Button>
              </Card>
              
              <Card title="Billing History">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>Date</th>
                      <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>Amount</th>
                      <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingData.invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{invoice.date}</td>
                        <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>${invoice.amount.toFixed(2)}</td>
                        <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{invoice.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          ) : (
            <p>Loading billing data...</p>
          )}
        </div>
      ) : (
        <p>Please log in to view billing information.</p>
      )}
    </div>
  );
}