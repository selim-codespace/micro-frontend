import { getButtonStyles, getInputStyles, getLabelStyles, getErrorStyles, getCardStyles, getTitleStyles } from '../index';

describe('UI Kit', () => {
  describe('Button', () => {
    it('should generate button styles correctly', () => {
      const styles = getButtonStyles();
      expect(styles).toBeDefined();
      expect(styles.backgroundColor).toBe('#0070f3'); // primary color
    });

    it('should generate button styles with different variants', () => {
      const primaryStyles = getButtonStyles('primary');
      const secondaryStyles = getButtonStyles('secondary');
      const successStyles = getButtonStyles('success');
      const warningStyles = getButtonStyles('warning');
      const errorStyles = getButtonStyles('error');
      
      expect(primaryStyles.backgroundColor).toBe('#0070f3');
      expect(secondaryStyles.backgroundColor).toBe('#7928ca');
      expect(successStyles.backgroundColor).toBe('#17c964');
      expect(warningStyles.backgroundColor).toBe('#f5a524');
      expect(errorStyles.backgroundColor).toBe('#f31260');
    });

    it('should generate button styles with different sizes', () => {
      const smStyles = getButtonStyles('primary', 'sm');
      const mdStyles = getButtonStyles('primary', 'md');
      const lgStyles = getButtonStyles('primary', 'lg');
      
      expect(smStyles.padding).toBe('0.25rem 0.5rem');
      expect(mdStyles.padding).toBe('0.5rem 1rem');
      expect(lgStyles.padding).toBe('1rem 1.5rem');
    });

    it('should generate disabled button styles', () => {
      const styles = getButtonStyles('primary', 'md', true);
      expect(styles.opacity).toBe(0.6);
      expect(styles.cursor).toBe('not-allowed');
    });
  });

  describe('Input', () => {
    it('should generate input styles correctly', () => {
      const styles = getInputStyles();
      expect(styles).toBeDefined();
      expect(styles.border).toBe('1px solid #cccccc');
    });

    it('should generate input styles with error', () => {
      const styles = getInputStyles(true);
      expect(styles.border).toBe('1px solid #f31260'); // error color
    });

    it('should generate label styles', () => {
      const styles = getLabelStyles();
      expect(styles).toBeDefined();
      expect(styles.display).toBe('block');
    });

    it('should generate error styles', () => {
      const styles = getErrorStyles();
      expect(styles).toBeDefined();
      expect(styles.color).toBe('#f31260'); // error color
    });
  });

  describe('Card', () => {
    it('should generate card styles correctly', () => {
      const styles = getCardStyles();
      expect(styles).toBeDefined();
      expect(styles.border).toBe('1px solid #eaeaea');
    });

    it('should generate title styles', () => {
      const styles = getTitleStyles();
      expect(styles).toBeDefined();
      expect(styles.fontWeight).toBe(700); // bold
    });
  });
});