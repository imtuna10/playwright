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
    await page.click("header[class='oxd-topbar'] li:nth-child(1) a:nth-child(1)");
    await page.click("button.oxd-button.oxd-button--medium.oxd-button--secondary");
    await page.locator(".oxd-input.oxd-input--focus").fill("Automation QA Engineer");
    await page.locator("textarea[placeholder='Type description here']").fill("Responsible for writing automated tests.");
    await page.locator("textarea[placeholder='Add note']").fill("Added via automated test.");
    await page.click("button[type='submit']");

    // Admin > Job > Pay Grades > Add
    await page.locator('span[class*="oxd-topbar-body-nav-tab-item"]').nth(1).click();
    await page.click(".oxd-icon.bi-plus.oxd-button-icon");
    await page.locator(".oxd-input.oxd-input--focus").fill("Grade A");
    await page.click("button[type='submit']");
    await expect(page.locator("div:nth-child(5) div:nth-child(1) div:nth-child(3) div:nth-child(1)")).toContainText("Grade A");

    // PIM > Configuration > Custom Fields > Add
    await page.click("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > aside:nth-child(1) > nav:nth-child(1) > div:nth-child(2) > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)");
    await page.click("span.oxd-topbar-body-nav-tab-item");
    await page.click("li.--active.oxd-topbar-body-nav-tab.--parent li:nth-child(2) a:nth-child(1)");
    await page.click("button.oxd-button.oxd-button--medium.oxd-button--secondary");
    await page.locator(".oxd-input.oxd-input--focus").fill("LinkedIn Profile");
    await page.locator("div.oxd-grid-item.oxd-grid-item--gutters div.oxd-input-group.oxd-input-field-bottom-space div div.oxd-select-text.oxd-select-text--active").click();
    await page.locator("div[role='option']:has-text('Personal Details')").click();
    await page.locator("div.oxd-grid-item.oxd-grid-item--gutters.organization-name-container div.oxd-input-group.oxd-input-field-bottom-space div div.oxd-select-text-input").click();
    await page.locator("div[role='option']:has-text('Text or Number')").click();
    await page.click("button[type='submit']");

    // Logout
    await page.locator('span.oxd-userdropdown-tab').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();

    console.log('Full test flow completed successfully.');
  } catch (error) {
    console.error('Test failed at step:', error.message);
    console.error('Stack trace:', error.stack);
    console.log('Current URL:', page.url());
    console.log('Page title:', await page.title());
    const errorMessages = await page.locator('.oxd-toast-error, .oxd-input-field-error-message').allTextContents();
    if (errorMessages.length > 0) {
      console.log('Error messages on page:', errorMessages);
    }
    throw error;
  }
});
