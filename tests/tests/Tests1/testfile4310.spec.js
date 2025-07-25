const { test, expect } = require('@playwright/test');

test('Admin/User Management + Job Titles + Pay Grades + Custom Fields flow', async ({ page }) => {
  try {
    // Login
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.waitForSelector('input[name="username"]', { timeout: 15000 });
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Admin > User Management > Add User
    await page.click('a[href="/web/index.php/admin/viewAdminModule"]');
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

    // Search & Reset
    await page.locator('input[placeholder="Type for hints..."]').first().fill(newUsername);
    await page.locator('button.oxd-button--secondary.orangehrm-left-space').click();
    await page.locator('button.oxd-button--ghost').click();
    await expect(page.locator('input[placeholder="Type for hints..."]').first()).toHaveValue('');

    // Admin > Job > Job Titles > Add
    await page.locator('span[class*="oxd-topbar-body-nav-tab-item"]').nth(1).click();
    await page.locator('li.--active.oxd-topbar-body-nav-tab.--parent > ul').waitFor({ state: 'visible' });
    await page.locator('li.--active.oxd-topbar-body-nav-tab.--parent > ul > li:nth-child(1) > a').click();
    await page.locator('div.orangehrm-header-container button').click();
    await page.locator('input.oxd-input.oxd-input--active').first().fill('Automation QA Engineer');
    await page.getByPlaceholder('Type description here').fill('Responsible for writing automated tests.');
    await page.locator('form div:nth-child(4) textarea').fill('Added via automated test.');
    await page.locator('form div.oxd-form-actions button[type="submit"]').click();

    // Admin > Job > Pay Grades > Add
    await page.locator('span[class*="oxd-topbar-body-nav-tab-item"]').nth(1).click();
    await page.locator('li.--active.oxd-topbar-body-nav-tab.--parent.--visited > ul > li:nth-child(2) > a').click();
    await page.locator('div.orangehrm-header-container button').click();
    await page.locator('form .oxd-form-row input').fill('Grade A');
    await page.locator('form div.oxd-form-actions button[type="submit"]').click();

    // PIM > Configuration > Custom Fields > Add
    await page.locator('aside nav ul > li:nth-child(2) > a > span').click();
    await page.locator('span.oxd-topbar-body-nav-tab-item', { hasText: 'Configuration' }).click();
    await page.locator('li.--active.oxd-topbar-body-nav-tab.--parent > ul > li:nth-child(2) > a').click();
    await page.locator('div.orangehrm-header-container > button').click();
    await page.locator('form div.organization-name-container input').fill('LinkedIn Profile');
    await page.locator('form div:nth-child(1) > div > div:nth-child(2) .oxd-select-text--after').click();
    await page.locator('div[role="option"]').nth(1).click();
    await page.locator('.oxd-select-text--after').nth(1).click();
    await page.locator("div[role='option']:has-text('Text or Number')").click();
    await page.locator('form .oxd-form-actions button.oxd-button--secondary').click();

    // Logout
    await page.locator('span.oxd-userdropdown-tab').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();

  } catch (error) {
  console.error('Test failed at step:', error.message);
  console.error('Stack trace:', error.stack);

  try {
    console.log('Current URL:', page.url());
    console.log('Page title:', await page.title());
  } catch (infoError) {
    console.warn('Unable to retrieve page info. The browser or page might be closed:', infoError.message);
  }

  try {
    const errorMessages = await page.locator('.oxd-toast-error, .oxd-input-field-error-message').allTextContents();
    if (errorMessages.length > 0) {
      console.log('Error messages on page:', errorMessages);
    }
  } catch (e) {
    console.warn('Could not get error messages from page:', e.message);
  }

  throw error;
}
});
