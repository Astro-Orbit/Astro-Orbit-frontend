import { test, expect } from '@playwright/test';

test('home page renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Astro Orbit')).toBeVisible();
  await expect(page.getByText('Get Started').first()).toBeVisible();
});
