import { test, expect } from '@playwright/test';

// Test: EPAM - Navigate to Client Work via Services menu
// Initial scaffold. The implementation will be added in a follow-up edit.

test('EPAM: navigate to Client Work via Services menu', async ({ page }) => {
  // 1) Navigate to EPAM homepage and verify it loads without errors
  const resp = await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });
  expect(resp).not.toBeNull();
  expect(resp!.status()).toBeLessThan(400);

  // 2) Open Services from header menu
  // Try locating as a link first, fall back to button if necessary
  const servicesLink = page.getByRole('link', { name: /Services/i }).first();
  if (await servicesLink.count()) {
    await expect(servicesLink).toBeVisible({ timeout: 10000 });
    await servicesLink.click();
  } else {
    const servicesButton = page.getByRole('button', { name: /Services/i }).first();
    await expect(servicesButton).toBeVisible({ timeout: 10000 });
    await servicesButton.click();
  }

  // 3) Click the "Explore Our Client Work" link in the Services menu/section
  const exploreLink = page.getByRole('link', { name: /Explore\\s+Our\\s+Client\\s+Work/i }).first();
  await expect(exploreLink).toBeVisible({ timeout: 10000 });
  await Promise.all([
    page.waitForLoadState('networkidle'),
    exploreLink.click(),
  ]);

  // 4) Verify "Client Work" text is visible on the resulting page
  const clientWorkLocator = page.getByText(/Client Work/i);
  await expect(clientWorkLocator).toBeVisible({ timeout: 15000 });
});
