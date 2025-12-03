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

interface AdminData {
  totalUsers: number;
  activeUsers: number;
  pendingRequests: number;
  systemStatus: string;
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<AdminData | null>(null);

  useEffect(() => {
    // Subscribe to state changes
    const unsubscribe = appStateManager.subscribe((state) => {
      setUser(state.user);
    });

    // Initialize state
    const initialState = appStateManager.getState();
    setUser(initialState.user);

    // Simulate fetching admin data
    setTimeout(() => {
      setAdminData({
        totalUsers: 1234,
        activeUsers: 987,
        pendingRequests: 45,
        systemStatus: 'Operational',
      });
    }, 1000);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}! Here's your admin dashboard:</p>
          {adminData ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <Card title="User Management">
                <p>Total users: {adminData.totalUsers.toLocaleString()}</p>
                <p>Active users: {adminData.activeUsers.toLocaleString()}</p>
              </Card>
              <Card title="System Status">
                <p>Pending requests: {adminData.pendingRequests}</p>
                <p>Status: {adminData.systemStatus}</p>
              </Card>
            </div>
          ) : (
            <p>Loading admin data...</p>
          )}
        </div>
      ) : (
        <p>Please log in to view admin dashboard.</p>
      )}
    </div>
  );
}