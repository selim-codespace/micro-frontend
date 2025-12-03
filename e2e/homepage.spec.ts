import { test, expect } from '@playwright/test';

test('should display homepage with navigation', async ({ page }) => {
  await page.goto('/');
  
  // Check that the homepage title is displayed
  await expect(page).toHaveTitle(/Micro Frontend Platform/);
  
  // Check that the main heading is displayed
  await expect(page.getByText('Welcome to the Micro Frontend Platform')).toBeVisible();
  
  // Check that navigation links are present
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Analytics' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Billing' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Notifications' })).toBeVisible();
});

test('should navigate to dashboard', async ({ page }) => {
  await page.goto('/');
  
  // Click on the dashboard link
  await page.getByRole('link', { name: 'Dashboard' }).click();
  
  // Check that we're on the dashboard page
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText('Dashboard')).toBeVisible();
});

test('should navigate to analytics', async ({ page }) => {
  await page.goto('/');
  
  // Click on the analytics link
  await page.getByRole('link', { name: 'Analytics' }).click();
  
  // Check that we're on the analytics page
  await expect(page).toHaveURL(/analytics/);
  await expect(page.getByText('Analytics Dashboard')).toBeVisible();
});

test('should navigate to billing', async ({ page }) => {
  await page.goto('/');
  
  // Click on the billing link
  await page.getByRole('link', { name: 'Billing' }).click();
  
  // Check that we're on the billing page
  await expect(page).toHaveURL(/billing/);
  await expect(page.getByText('Billing Information')).toBeVisible();
});

test('should navigate to admin', async ({ page }) => {
  await page.goto('/');
  
  // Click on the admin link
  await page.getByRole('link', { name: 'Admin' }).click();
  
  // Check that we're on the admin page
  await expect(page).toHaveURL(/admin/);
  await expect(page.getByText('Admin Dashboard')).toBeVisible();
});

test('should navigate to notifications', async ({ page }) => {
  await page.goto('/');
  
  // Click on the notifications link
  await page.getByRole('link', { name: 'Notifications' }).click();
  
  // Check that we're on the notifications page
  await expect(page).toHaveURL(/notifications/);
  await expect(page.getByText('Notifications')).toBeVisible();
});