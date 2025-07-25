const { test, expect } = require('@playwright/test');

// Test case: Admin/User Management page: add user, search, reset and verify
// ve Admin > Organization > Locations sayfasında lokasyon ekleme, arama, reset ve kayıt kontrolü

test('Admin/User Management page: add user, search, reset and verify', async ({ page }) => {
  try {
    // Login
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.waitForSelector('input[name="username"]', { timeout: 15000 });
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Admin sekmesine git
    await page.waitForSelector('a[href="/web/index.php/admin/viewAdminModule"]', { timeout: 15000 });
    await page.click('a[href="/web/index.php/admin/viewAdminModule"]');

    // Add User işlemi
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.locator('h6:has-text("Add User")')).toBeVisible();

    const newUsername = 'testuser_' + Date.now();

    await page.locator('div.oxd-select-text').nth(0).click();
    await page.locator('div[role="option"]:has-text("Admin")').click();

    await page.locator('div.oxd-select-text').nth(1).click();
    await page.locator('div[role="option"]:has-text("Enabled")').click();

    await page.locator('input[placeholder="Type for hints..."]').fill('Andres Reese Braun');
    await page.locator('input[autocomplete="off"]').nth(1).fill(newUsername);

    await page.locator('input[type="password"]').nth(0).fill('Testpass123!');
    await page.locator('input[type="password"]').nth(1).fill('Testpass123!');

    await page.getByRole('button', { name: 'Save' }).click();

    // Arama ve Reset User
    await page.waitForSelector('input[placeholder="Type for hints..."]', { timeout: 15000 });
    await page.locator('input[placeholder="Type for hints..."]').first().fill(newUsername);
    await page.locator('button.oxd-button--secondary.orangehrm-left-space').click();
    await page.locator('button.oxd-button--ghost').click();
    await expect(page.locator('input[placeholder="Type for hints..."]').first()).toHaveValue('');

    // Organization > Locations
    await page.locator('li.oxd-topbar-body-nav-tab:has-text("Organization")').click();
    await page.getByRole('menuitem', { name: 'Locations' }).click();

    await expect(page.locator('div.oxd-table-filter')).toBeVisible({ timeout: 10000 });

    await page.getByRole('button', { name: 'Add' }).click();

    const locationName = 'Test Location ' + Date.now();
    const countryName = 'Albania';

    await page.locator('input.oxd-input').nth(0).fill(locationName);
    await page.locator('input.oxd-input').nth(1).fill('TestCity');
    await page.locator('input.oxd-input').nth(2).fill('TestState');
    await page.locator('input.oxd-input').nth(3).fill('12345');

    await page.locator('div.oxd-select-text').last().click();
    await page.locator(`div[role="option"]:has-text("${countryName}")`).click();

    await page.getByRole('button', { name: 'Save' }).click();

    // Arama ve Reset Location
    const cityInput = page.locator('div.oxd-table-filter input').nth(1);
    await cityInput.fill('TestCity');

    await page.locator('button:has-text("Search")').click();
    await expect(page.locator('div.oxd-table-cell:has-text("TestCity")')).toBeVisible();

    await page.locator('button:has-text("Reset")').click();

    // Logout
    await page.locator('span.oxd-userdropdown-tab').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();

    console.log('Test completed successfully!');

  } catch (error) {
    console.error('Test failed at step:', error.message);
    console.error('Stack trace:', error.stack);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ path: `error-screenshot-${timestamp}.png`, fullPage: true });
    console.log('Current URL:', page.url());
    console.log('Page title:', await page.title());
    const errorMessages = await page.locator('.oxd-toast-error, .oxd-input-field-error-message').allTextContents();
    if (errorMessages.length > 0) {
      console.log('Error messages on page:', errorMessages);
    }
    throw error;
  }
});
