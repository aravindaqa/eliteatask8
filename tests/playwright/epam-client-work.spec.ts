/* Playwright test: EPAM Client Work navigation */
import { test, expect } from '@playwright/test';

test.describe('EPAM - Client Work navigation', () => {
  test('should navigate from Services -> Explore Our Client Work and show Client Work text', async ({ page }) => {
    // 1. Navigate to EPAM homepage and confirm load
    await page.goto('https://www.epam.com/', { waitUntil: 'load' });
    // Basic sanity check: page title contains "EPAM" or page has a landmark header
    await expect(page).toHaveTitle(/EPAM/i);

    // 2. Open the header Services menu
    // Try role-based selector first, fallback to text selector
    const services = page.getByRole('link', { name: /Services/i });
    await services.first().click();

    // 3. Click the "Explore Our Client Work" link
    const exploreLink = page.getByRole('link', { name: /Explore Our Client Work/i });
    await exploreLink.first().click();

    // 4. Confirm navigation to Client Work page and that "Client Work" text is visible
    // Wait for navigation to complete
    await page.waitForLoadState('load');
    const clientWorkText = page.getByText(/Client Work/i);
    await expect(clientWorkText.first()).toBeVisible();
  });
});
