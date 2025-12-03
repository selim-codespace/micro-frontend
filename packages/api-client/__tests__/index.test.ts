import { ApiClient, apiClient } from '../index';

describe('API Client', () => {
  describe('ApiClient class', () => {
    let client: ApiClient;

    beforeEach(() => {
      client = new ApiClient({
        baseURL: 'https://api.example.com',
        timeout: 5000,
      });
    });

    it('should create an instance', () => {
      expect(client).toBeInstanceOf(ApiClient);
    });

    it('should set base URL and timeout', () => {
      // @ts-ignore - accessing private properties for testing
      expect(client.baseURL).toBe('https://api.example.com');
      // @ts-ignore - accessing private properties for testing
      expect(client.timeout).toBe(5000);
    });

    it('should set auth token', () => {
      client.setAuthToken('test-token');
      // @ts-ignore - accessing private properties for testing
      expect(client.headers.Authorization).toBe('Bearer test-token');
    });

    it('should clear auth token', () => {
      client.setAuthToken('test-token');
      client.clearAuth();
      // @ts-ignore - accessing private properties for testing
      expect(client.headers.Authorization).toBeUndefined();
    });
  });

  describe('apiClient instance', () => {
    it('should be an instance of ApiClient', () => {
      expect(apiClient).toBeInstanceOf(ApiClient);
    });
  });
});