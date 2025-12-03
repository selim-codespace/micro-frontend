'use client';

// @ts-expect-error - Workspace alias resolution
import { Card } from '@ui-kit';
// @ts-expect-error - Workspace alias resolution
import { appStateManager } from '@shared-state';

import React, { useState, useEffect } from 'react';

interface User {
  name: string;
  // Add other user properties as needed
}

interface AnalyticsData {
  visitors: number;
  pageViews: number;
  bounceRate: string;
  avgSessionDuration: string;
}

export default function AnalyticsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    // Subscribe to state changes
    const unsubscribe = appStateManager.subscribe((state: { user: User | null }) => {
      setUser(state.user);
    });

    // Initialize state
    const initialState = appStateManager.getState();
    setUser(initialState.user);

    // Simulate fetching analytics data
    setTimeout(() => {
      setAnalyticsData({
        visitors: 12345,
        pageViews: 54321,
        bounceRate: '32%',
        avgSessionDuration: '2m 45s',
      });
    }, 1000);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}! Here's your analytics data:</p>
          {analyticsData ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <Card title="Visitors">
                <p>Total visitors: {analyticsData.visitors.toLocaleString()}</p>
              </Card>
              <Card title="Page Views">
                <p>Total page views: {analyticsData.pageViews.toLocaleString()}</p>
              </Card>
              <Card title="Bounce Rate">
                <p>Bounce rate: {analyticsData.bounceRate}</p>
              </Card>
              <Card title="Session Duration">
                <p>Avg. session duration: {analyticsData.avgSessionDuration}</p>
              </Card>
            </div>
          ) : (
            <p>Loading analytics data...</p>
          )}
        </div>
      ) : (
        <p>Please log in to view analytics data.</p>
      )}
    </div>
  );
}