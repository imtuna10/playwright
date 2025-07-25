const { test, expect } = require('@playwright/test');

// Test case: Admin/User Management page: add user, search, reset and verify
// ve Admin > Organization > Locations sayfasında lokasyon ekleme, arama, reset ve kayıt kontrolü

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

  // Admin sayfasına geri dön ve kullanıcı ara
  await page.waitForSelector('input[placeholder="Type for hints..."]', { timeout: 15000 });

  const usernameSearchInput = page.locator('input[placeholder="Type for hints..."]').first();
  await usernameSearchInput.fill(newUsername);

  const searchBtn = page.locator('button.oxd-button--secondary.orangehrm-left-space');
  await searchBtn.waitFor({ state: 'visible', timeout: 15000 });
  await searchBtn.click();

  const resetBtn = page.locator('button.oxd-button--ghost');
  await resetBtn.waitFor({ state: 'visible', timeout: 15000 });
  await resetBtn.click();

  await expect(usernameSearchInput).toHaveValue('');

  // 🔽 Organization > Locations sayfasına git
  const organizationTab = page.locator('li.oxd-topbar-body-nav-tab:has-text("Organization")');
  await organizationTab.click();

  const locationsLink = page.getByRole('menuitem', { name: 'Locations' });
  await locationsLink.waitFor({ state: 'visible', timeout: 10000 });
  await locationsLink.click();

  const filterSection = page.locator('div.oxd-table-filter');
  await expect(filterSection).toBeVisible({ timeout: 10000 });

  // Yeni lokasyon ekle
  const addLocationBtn = page.getByRole('button', { name: 'Add' });
  await addLocationBtn.click();

  const locationName = 'Test Location ' + Date.now();
  const countryName = 'Albania';

  await page.locator('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > form > div:nth-child(1) > div > div > div > div:nth-child(2) > input').fill(locationName);
  await page.locator('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > form > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > input').fill('TestCity');
  await page.locator('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > form > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(2) > input').fill('TestState');
  await page.locator('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > form > div:nth-child(2) > div > div:nth-child(3) > div > div:nth-child(2) > input').fill('12345');

  // Ülke seçim dropdown'u
  await page.locator('div.oxd-select-text').last().click();
  await page.locator(`div[role="option"]:has-text("${countryName}")`).click();

  await page.getByRole('button', { name: 'Save' }).click();

  // Arama kutusuna yeni eklenen şehir adını yaz
  const cityInput = page.locator('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div.oxd-table-filter > div.oxd-table-filter-area > form > div.oxd-form-row > div > div:nth-child(2) > div > div:nth-child(2) > input');

  await cityInput.fill('TestCity');

  const locationSearchBtn = page.locator('button:has-text("Search")');
  await locationSearchBtn.click();

  // Arama sonucunda yeni eklenen lokasyonun geldiğini kontrol et
  const searchResults = page.locator('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div.orangehrm-paper-container > div.orangehrm-container > div > div');

  await expect(searchResults).toBeVisible();

  // Reset butonuna tıkla
  const locationResetBtn = page.locator('button:has-text("Reset")');
  await locationResetBtn.click();
  // Oturumu kapat
  const userDropdown = page.locator('span.oxd-userdropdown-tab');
  await userDropdown.click();
  const logoutBtn = page.getByRole('menuitem', { name: 'Logout' });
  await logoutBtn.click();
});

//testi çalıştırmak için terminalde şu komutu kullanacağız
// npx playwright test tests/tests/Tests1/userandlocations.spec.js --headed --config=playwright.config.js

