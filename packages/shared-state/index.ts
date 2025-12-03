// Shared State Management for Micro Frontend Platform

// @ts-ignore - This will be resolved when the package is linked
import { generateId } from '@micro-frontend/shared-utils';

// Export federation loader for micro frontend integration
export { loadRemoteComponent, useRemoteComponent } from './src/federation-loader';

// Type definitions
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  notifications: Notification[];
  isLoading: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
}

// Initial state
export const initialState: AppState = {
  user: null,
  theme: 'light',
  notifications: [],
  isLoading: false,
};

// Event bus for cross-domain communication
class EventBus {
  private events: { [key: string]: Function[] } = {};

  on(event: string, callback: Function): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event: string, callback: Function): void {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }

  emit(event: string, data?: any): void {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

export const eventBus = new EventBus();

// Simple state management using a reactive pattern
class StateManager<T> {
  private state: T;
  private listeners: Function[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(newState: Partial<T>): void {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  subscribe(listener: Function): Function {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// Create the main app state manager
export const appStateManager = new StateManager<AppState>(initialState);

// Helper functions for common state operations
export const setUser = (user: User | null): void => {
  appStateManager.setState({ user });
};

export const setTheme = (theme: 'light' | 'dark'): void => {
  appStateManager.setState({ theme });
};

export const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>): void => {
  const newNotification: Notification = {
    id: generateId('notif'),
    timestamp: new Date(),
    ...notification,
  };
  const currentState = appStateManager.getState();
  appStateManager.setState({
    notifications: [...currentState.notifications, newNotification],
  });
};

export const removeNotification = (id: string): void => {
  const currentState = appStateManager.getState();
  appStateManager.setState({
    notifications: currentState.notifications.filter(notification => notification.id !== id),
  });
};

export const setLoading = (isLoading: boolean): void => {
  appStateManager.setState({ isLoading });
};