// UI Kit for Micro Frontend Platform

// @ts-ignore - This will be resolved when the package is linked
import { colors, typography, spacing, borderRadius } from '@micro-frontend/design-tokens';

// Basic Button Component
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

// Simple function to create button styles
export const getButtonStyles = (variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' = 'primary', size: 'sm' | 'md' | 'lg' = 'md', disabled: boolean = false) => {
  const baseStyles = {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.medium,
    border: 'none',
    borderRadius: borderRadius.md,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease-in-out',
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary,
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: colors.secondary,
      color: '#ffffff',
    },
    success: {
      backgroundColor: colors.success,
      color: '#ffffff',
    },
    warning: {
      backgroundColor: colors.warning,
      color: '#ffffff',
    },
    error: {
      backgroundColor: colors.error,
      color: '#ffffff',
    },
  };

  const sizeStyles = {
    sm: {
      padding: `${spacing.xs} ${spacing.sm}`,
      fontSize: typography.fontSize.sm,
    },
    md: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: typography.fontSize.base,
    },
    lg: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: typography.fontSize.lg,
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };
};

// Basic Input Component
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// Simple function to create input styles
export const getInputStyles = (hasError: boolean = false) => {
  return {
    fontFamily: typography.fontFamily,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    border: `1px solid ${hasError ? colors.error : '#cccccc'}`,
    fontSize: typography.fontSize.base,
    width: '100%',
    boxSizing: 'border-box' as const,
  };
};

// Simple function to create label styles
export const getLabelStyles = (hasError: boolean = false) => {
  return {
    display: 'block',
    marginBottom: spacing.xs,
    fontWeight: typography.fontWeight.medium,
    color: hasError ? colors.error : colors.text,
  };
};

// Simple function to create error styles
export const getErrorStyles = () => {
  return {
    color: colors.error,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
  };
};

// Basic Card Component
export interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

// Simple function to create card styles
export const getCardStyles = () => {
  return {
    border: `1px solid #eaeaea`,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    backgroundColor: colors.background,
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  };
};

// Simple function to create title styles
export const getTitleStyles = () => {
  return {
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
    color: colors.text,
  };
};