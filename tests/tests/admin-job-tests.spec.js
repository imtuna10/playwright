const { test, expect } = require('@playwright/test');

test('Admin Job Settings: Add Employment Status and Job Category', async ({ page }) => {
  // Login
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');

  // =============== EMPLOYMENT STATUS EKLE ===============
  await page.locator('a[href="/web/index.php/admin/viewAdminModule"]').click(); // Admin sekmesi
  await page.getByText('Job').click(); // Job menüsü
  await page.getByRole('menuitem', { name: 'Employment Status' }).click();

  await page.getByRole('button', { name: 'Add' }).click();
  const employmentStatus = 'Freelancer ' + Date.now();
  await page.locator('input.oxd-input.oxd-input--active').nth(0).fill(employmentStatus);
  await page.getByRole('button', { name: 'Save' }).click();

  // =============== JOB CATEGORY EKLE ===============
  await page.getByText('Job').click();
  await page.getByRole('menuitem', { name: 'Job Categories' }).click();

  await page.getByRole('button', { name: 'Add' }).click();
  const jobCategory = 'Remote Workers ' + Date.now();
  await page.locator('input.oxd-input.oxd-input--active').first().fill(jobCategory);
  await page.getByRole('button', { name: 'Save' }).click();

  // =============== Logout ===============
  await page.locator('.oxd-userdropdown-tab').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
});
