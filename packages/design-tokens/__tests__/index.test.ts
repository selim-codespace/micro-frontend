import { colors, typography, spacing, borderRadius, shadows, breakpoints, transitions, zIndex } from '../index';

describe('Design Tokens', () => {
  describe('Colors', () => {
    it('should have primary color defined', () => {
      expect(colors.primary).toBeDefined();
      expect(typeof colors.primary).toBe('string');
    });

    it('should have all required colors', () => {
      expect(colors).toHaveProperty('primary');
      expect(colors).toHaveProperty('secondary');
      expect(colors).toHaveProperty('success');
      expect(colors).toHaveProperty('warning');
      expect(colors).toHaveProperty('error');
      expect(colors).toHaveProperty('background');
      expect(colors).toHaveProperty('surface');
      expect(colors).toHaveProperty('text');
      expect(colors).toHaveProperty('textSecondary');
    });
  });

  describe('Typography', () => {
    it('should have font family defined', () => {
      expect(typography.fontFamily).toBeDefined();
      expect(typeof typography.fontFamily).toBe('string');
    });

    it('should have font sizes', () => {
      expect(typography.fontSize).toBeDefined();
      expect(Object.keys(typography.fontSize).length).toBeGreaterThan(0);
    });

    it('should have font weights', () => {
      expect(typography.fontWeight).toBeDefined();
      expect(Object.keys(typography.fontWeight).length).toBeGreaterThan(0);
    });
  });

  describe('Spacing', () => {
    it('should have spacing values', () => {
      expect(spacing).toBeDefined();
      expect(Object.keys(spacing).length).toBeGreaterThan(0);
    });
  });

  describe('Border Radius', () => {
    it('should have border radius values', () => {
      expect(borderRadius).toBeDefined();
      expect(Object.keys(borderRadius).length).toBeGreaterThan(0);
    });
  });

  describe('Shadows', () => {
    it('should have shadow values', () => {
      expect(shadows).toBeDefined();
      expect(Object.keys(shadows).length).toBeGreaterThan(0);
    });
  });

  describe('Breakpoints', () => {
    it('should have breakpoint values', () => {
      expect(breakpoints).toBeDefined();
      expect(Object.keys(breakpoints).length).toBeGreaterThan(0);
    });
  });

  describe('Transitions', () => {
    it('should have transition values', () => {
      expect(transitions).toBeDefined();
      expect(Object.keys(transitions).length).toBeGreaterThan(0);
    });
  });

  describe('Z-Index', () => {
    it('should have z-index values', () => {
      expect(zIndex).toBeDefined();
      expect(Object.keys(zIndex).length).toBeGreaterThan(0);
    });
  });
});