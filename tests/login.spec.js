import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practicetestautomation.com/practice-test-login/';

test('successful login', async ({ page }) => {
  await page.goto(BASE_URL);

  // Fill in username and password
  await page.fill('#username', 'student');
  await page.fill('#password', 'Password123');

  // Click the login button
  await page.click('#submit');

  // Assert successful login
  await expect(page.locator('.post-title')).toHaveText('Logged In Successfully');
});

test('user name not valid', async ({ page }) => {
  await page.goto(BASE_URL);

  // Fill in invalid username and valid password
  await page.fill('#username', 'invalidUser');
  await page.fill('#password', 'Password123');

  // Click the login button
  await page.click('#submit');

  // Assert error message
  await expect(page.locator('#error')).toHaveText('Your username is invalid!');
});

test('invalid password', async ({ page }) => {
  await page.goto(BASE_URL);

  // Fill in valid username and invalid password
  await page.fill('#username', 'student');
  await page.fill('#password', 'InvalidPassword');

  // Click the login button
  await page.click('#submit');

  // Assert error message
  await expect(page.locator('#error')).toBeVisible();
  await expect(page.locator('#error')).toHaveText('Your password is invalid!');
});