const { test, expect } = require('@playwright/test');

// Test case: Admin/User Management page: add user, search, reset and verify
// Daha temiz, hatasız çalışacak şekilde düzenlendi.

test('Admin/User Management page: add user, search, reset and verify', async ({ page }) => {
  // 1. Giriş yap
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.waitForSelector('input[name="username"]', { timeout: 15000 });

  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  // Admin modülüne git
  await page.waitForSelector('a[href="/web/index.php/admin/viewAdminModule"]', { timeout: 15000 });
  await page.click('a[href="/web/index.php/admin/viewAdminModule"]');

  // Add User
  const addBtn = page.getByRole('button', { name: 'Add' });
  await addBtn.waitFor({ timeout: 15000 });
  await addBtn.click();

  const addUserHeader = page.locator('h6:has-text("Add User")');
  await expect(addUserHeader).toBeVisible();

  // Add User formunu doldur
  const newUsername = 'testuser_' + Date.now();

  const roleDropdown = page.locator('div.oxd-select-text').nth(0);
  await roleDropdown.waitFor({ timeout: 15000 });
  await roleDropdown.click();
  await page.locator('div[role="option"]:has-text("Admin")').click();

  const statusDropdown = page.locator('div.oxd-select-text').nth(1);
  await statusDropdown.waitFor({ timeout: 15000 });
  await statusDropdown.click();
  await page.locator('div[role="option"]:has-text("Enabled")').click();

  const employeeNameInput = page.locator('input[placeholder="Type for hints..."]').nth(0);
  await employeeNameInput.waitFor({ timeout: 15000 });
  await employeeNameInput.fill('Andres Reese Braun');

  const usernameInput = page.locator('input[autocomplete="off"]').nth(1);
  await usernameInput.waitFor({ timeout: 15000 });
  await usernameInput.fill(newUsername);

  const passwordInput = page.locator('input[type="password"]').nth(0);
  const confirmPasswordInput = page.locator('input[type="password"]').nth(1);

  await passwordInput.fill('Testpass123!');
  await confirmPasswordInput.fill('Testpass123!');

  await page.getByRole('button', { name: 'Save' }).click();

  // Admin sayfasına geri dön ve yeni eklenen kullanıcıyı ara
  await page.waitForSelector('input[placeholder="Type for hints..."]', { timeout: 15000 });

  const usernameSearchInput = page.locator('input[placeholder="Type for hints..."]').first();
  await usernameSearchInput.fill(newUsername);

  const searchBtn = page.locator('button.oxd-button--secondary.orangehrm-left-space');
  await searchBtn.waitFor({ state: 'visible', timeout: 15000 });
  await searchBtn.click();

  // Reset butonuna bas ve alanların temizlendiğini doğrula
  const resetBtn = page.locator('button.oxd-button--ghost');
  await resetBtn.waitFor({ state: 'visible', timeout: 15000 });
  await resetBtn.click();

  await expect(usernameSearchInput).toHaveValue('');
});

//testi çalıştırmak için terminalde şu komutu kullanabilirsiniz:
// npx playwright test tests/Tests1/usermanagement1.spec.js
