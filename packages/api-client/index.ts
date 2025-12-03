// API Client for Micro Frontend Platform

// @ts-ignore - This will be resolved when the package is linked
import { isEmpty } from '@micro-frontend/shared-utils';

// Type definitions
export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Simple API client class
export class ApiClient {
  private baseURL: string;
  private timeout: number;
  private headers: Record<string, string>;

  constructor(config: ApiConfig) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout || 5000;
    this.headers = config.headers || {};
  }

  // Generic request method
  async request<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const fullUrl = `${this.baseURL}${url}`;
    const mergedHeaders = { ...this.headers, ...headers };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      
      const response = await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...mergedHeaders,
        },
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      const responseData = await response.json();
      
      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      throw {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        status: (error as any).status,
      };
    }
  }

  // GET request
  async get<T>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'GET', undefined, headers);
  }

  // POST request
  async post<T>(url: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'POST', data, headers);
  }

  // PUT request
  async put<T>(url: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'PUT', data, headers);
  }

  // DELETE request
  async delete<T>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'DELETE', undefined, headers);
  }

  // Helper method to set authentication token
  setAuthToken(token: string): void {
    if (!isEmpty(token)) {
      this.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.headers['Authorization'];
    }
  }

  // Helper method to clear authentication
  clearAuth(): void {
    delete this.headers['Authorization'];
  }
}

// Default API client instance
export const apiClient = new ApiClient({
  baseURL: 'http://localhost:3000/api',
});

// Authentication API functions
export const authApi = {
  // Login user
  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> {
    return apiClient.post('/auth/login', { email, password });
  },

  // Register user
  async register(userData: { name: string; email: string; password: string }): Promise<ApiResponse<{ token: string; user: any }>> {
    return apiClient.post('/auth/register', userData);
  },

  // Get current user
  async getCurrentUser(): Promise<ApiResponse<any>> {
    return apiClient.get('/auth/me');
  },

  // Logout user
  async logout(): Promise<ApiResponse<void>> {
    return apiClient.post('/auth/logout');
  },
};

// User API functions
export const userApi = {
  // Get all users
  async getUsers(): Promise<ApiResponse<any[]>> {
    return apiClient.get('/users');
  },

  // Get user by ID
  async getUserById(id: string): Promise<ApiResponse<any>> {
    return apiClient.get(`/users/${id}`);
  },

  // Update user
  async updateUser(id: string, userData: any): Promise<ApiResponse<any>> {
    return apiClient.put(`/users/${id}`, userData);
  },

  // Delete user
  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/users/${id}`);
  },
};