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

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: Date;
  type: string;
}

export default function NotificationsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Subscribe to state changes
    const unsubscribe = appStateManager.subscribe((state: { user: User | null }) => {
      setUser(state.user);
    });

    // Initialize state
    const initialState = appStateManager.getState();
    setUser(initialState.user);

    // Simulate fetching notifications
    setTimeout(() => {
      setNotifications([
        { id: 1, title: 'New Message', message: 'You have a new message from John', timestamp: new Date(), type: 'info' },
        { id: 2, title: 'System Update', message: 'System will be updated at 2 AM', timestamp: new Date(), type: 'warning' },
        { id: 3, title: 'Payment Received', message: 'Your payment of $99.99 has been received', timestamp: new Date(), type: 'success' },
      ]);
    }, 1000);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}! Here are your notifications:</p>
          {notifications.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {notifications.map((notification) => (
                <Card key={notification.id} title={notification.title}>
                  <p>{notification.message}</p>
                  <p style={{ fontSize: '0.8rem', color: '#666' }}>
                    {notification.timestamp.toLocaleString()}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <p>No notifications at this time.</p>
          )}
        </div>
      ) : (
        <p>Please log in to view notifications.</p>
      )}
    </div>
  );
}