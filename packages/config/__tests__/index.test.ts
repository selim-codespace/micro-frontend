import { envConfig, moduleFederationConfig, navigationConfig, themeConfig, authConfig, errorBoundaryConfig, performanceConfig } from '../index';

describe('Config', () => {
  describe('envConfig', () => {
    it('should have environment configuration', () => {
      expect(envConfig).toBeDefined();
      expect(typeof envConfig.isDevelopment).toBe('boolean');
      expect(typeof envConfig.isProduction).toBe('boolean');
      expect(typeof envConfig.isTest).toBe('boolean');
    });
  });

  describe('moduleFederationConfig', () => {
    it('should have module federation configuration', () => {
      expect(moduleFederationConfig).toBeDefined();
      expect(moduleFederationConfig.hostAppName).toBe('host');
      expect(Array.isArray(moduleFederationConfig.remoteAppNames)).toBe(true);
      expect(typeof moduleFederationConfig.remoteEntryFileName).toBe('string');
    });
  });

  describe('navigationConfig', () => {
    it('should have navigation configuration', () => {
      expect(navigationConfig).toBeDefined();
      expect(Array.isArray(navigationConfig.mainNavItems)).toBe(true);
      expect(Array.isArray(navigationConfig.userMenuItems)).toBe(true);
    });
  });

  describe('themeConfig', () => {
    it('should have theme configuration', () => {
      expect(themeConfig).toBeDefined();
      expect(Array.isArray(themeConfig.themes)).toBe(true);
      expect(typeof themeConfig.defaultTheme).toBe('string');
      expect(typeof themeConfig.themeStorageKey).toBe('string');
    });
  });

  describe('authConfig', () => {
    it('should have auth configuration', () => {
      expect(authConfig).toBeDefined();
      expect(typeof authConfig.sessionStorageKey).toBe('string');
      expect(typeof authConfig.tokenExpirationBuffer).toBe('number');
      expect(typeof authConfig.loginPath).toBe('string');
      expect(typeof authConfig.postLoginRedirectPath).toBe('string');
    });
  });

  describe('errorBoundaryConfig', () => {
    it('should have error boundary configuration', () => {
      expect(errorBoundaryConfig).toBeDefined();
      expect(typeof errorBoundaryConfig.showDetailsInDevelopment).toBe('boolean');
      expect(typeof errorBoundaryConfig.genericErrorMessage).toBe('string');
    });
  });

  describe('performanceConfig', () => {
    it('should have performance configuration', () => {
      expect(performanceConfig).toBeDefined();
      expect(typeof performanceConfig.enabled).toBe('boolean');
      expect(typeof performanceConfig.metricsEndpoint).toBe('string');
      expect(typeof performanceConfig.samplingRate).toBe('number');
    });
  });
});