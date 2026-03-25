import { test, expect } from '@playwright/test';

describe('EPAM homepage client work flow', () => {
  test('EPAM homepage -> Services -> Explore Our Client Work -> Client Work visible', async ({ page }) => {
    // 1. Open homepage
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

    // 2. Ensure the header is visible
    const header = page.locator('header');
    await expect(header).toBeVisible({ timeout: 10000 });

    // 3. Click Services in top nav
    const services = page.getByRole('link', { name: /Services/i });
    await expect(services).toBeVisible({ timeout: 10000 });
    await services.click();

    // 4. Click Explore Our Client Work link (try role-based then text)
    const explore = page.getByRole('link', { name: /Explore.*Client Work/i });
    if (await explore.count() === 0) {
      // fallback to text locator
      await page.locator('text=/Explore\\s*Our\\s*Client\\s*Work/i').first().click();
    } else {
      await explore.first().click();
    }

    // 5. Verify 'Client Work' text visible
    await expect(page.locator('text=Client Work')).toBeVisible({ timeout: 10000 });
  });
});
