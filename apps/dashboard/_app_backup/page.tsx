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

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Subscribe to state changes
    const unsubscribe = appStateManager.subscribe((state: { user: User | null }) => {
      setUser(state.user);
    });

    // Initialize state
    const initialState = appStateManager.getState();
    setUser(initialState.user);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <Card title="Sales">
              <p>Total sales: $12,345</p>
            </Card>
            <Card title="Users">
              <p>Active users: 1,234</p>
            </Card>
            <Card title="Performance">
              <p>Response time: 123ms</p>
            </Card>
          </div>
        </div>
      ) : (
        <p>Please log in to view the dashboard.</p>
      )}
    </div>
  );
}