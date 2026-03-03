import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practice.expandtesting.com/register';

test('successful registration', async ({ page }) => {
  await page.goto(BASE_URL);

  // Fill in registration form
  const username = 'jl' + Date.now();
  await page.fill('#username', username);
  await page.fill('#password', 'Password123@');
  await page.fill('#confirmPassword', 'Password123@');

  // Click the register button
  await page.getByRole('button', { name: 'Register' }).click();

  // Assert successful registration
  await expect(page.locator('h1', { hasText: 'Test Login page for Automation Testing Practice' })).toBeVisible();
});

test('required fields validation', async ({ page }) => {
  await page.goto(BASE_URL);

  // Click the register button without filling in the form
  await page.getByRole('button', { name: 'Register' }).click();

  // Assert validation messages for required fields
  await expect(page.locator('#flash')).toBeVisible();
  await expect(page.locator('#flash')).toHaveText('All fields are required.');
});


test('passwords do not match validation', async ({ page }) => {
  await page.goto(BASE_URL);

  // Fill in registration form with mismatched passwords
  const username = 'jl' + Date.now();
  await page.fill('#username', username);
  await page.fill('#password', 'Password123@');
  await page.fill('#confirmPassword', 'Password1234@');

  // Click the register button
  await page.getByRole('button', { name: 'Register' }).click();

  // Assert validation messages for password mismatch
  await expect(page.locator('#flash')).toBeVisible();
  await expect(page.locator('#flash')).toHaveText('Passwords do not match.');
});