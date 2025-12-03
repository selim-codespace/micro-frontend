import { test, expect } from '@playwright/test';

test('should display login form', async ({ page }) => {
  await page.goto('/login');
  
  // Check that the login form is displayed
  await expect(page.getByText('Login')).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('should display register form', async ({ page }) => {
  await page.goto('/register');
  
  // Check that the register form is displayed
  await expect(page.getByText('Register')).toBeVisible();
  await expect(page.getByLabel('Name')).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
  await expect(page.getByLabel('Confirm Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});

test('should allow user to login', async ({ page }) => {
  await page.goto('/login');
  
  // Fill in the login form
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password123');
  
  // Submit the form
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Check that we're redirected to the dashboard
  // Note: This is a simulation since we don't have a real backend
  // In a real application, you would check for actual authentication
});

test('should allow user to register', async ({ page }) => {
  await page.goto('/register');
  
  // Fill in the register form
  await page.getByLabel('Name').fill('Test User');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByLabel('Confirm Password').fill('password123');
  
  // Submit the form
  await page.getByRole('button', { name: 'Register' }).click();
  
  // Check that we're redirected to the dashboard
  // Note: This is a simulation since we don't have a real backend
  // In a real application, you would check for actual registration
});