const { test, expect } = require('@playwright/test');
const { AppPage } = require('../pages/appPage');

test('Admin/User Management + Job Titles + Pay Grades + Custom Fields flow', async ({ page }) => {
  const app = new AppPage(page);
  const newUsername = 'testuser_' + Date.now();

  try {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await app.usernameInput.fill('Admin');
    await app.passwordInput.fill('admin123');
    await app.loginButton.click();

    // Add User
    await app.adminMenu.click();
    await app.addUserButton.click();
    await expect(app.addUserHeader).toBeVisible();
    await app.userRoleSelect.click();
    await page.locator('div[role="option"]:has-text("Admin")').click();
    await app.statusSelect.click();
    await page.locator('div[role="option"]:has-text("Enabled")').click();
    await app.employeeNameInput.fill('Andres Reese Braun');
    await app.usernameField.fill(newUsername);
    await app.passwordField.fill('Testpass123!');
    await app.confirmPasswordField.fill('Testpass123!');
    await app.saveUserButton.click();

    // Search & Reset
    await app.searchInput.fill(newUsername);
    await app.searchButton.click();
    await app.resetButton.click();
    await expect(app.searchInput).toHaveValue('');

    // Job Titles
    await app.adminJobTab.click();
    await app.jobTitleMenu.click();
    await app.addJobTitleButton.click();
    await app.jobTitleInput.fill('Automation QA Engineer');
    await app.jobDescInput.fill('Responsible for writing automated tests.');
    await app.jobNoteInput.fill('Added via automated test.');
    await app.saveJobButton.click();

    // Pay Grades
    await app.adminJobTab.click();
    await app.payGradesMenu.click();
    await app.addPayGradeButton.click();
    await app.payGradeNameInput.fill('Grade A');
    await app.savePayGradeButton.click();

    // Custom Fields
    await app.pimMenu.click();
    await app.configTab.click();
    await app.customFieldsMenu.click();
    await app.addCustomFieldButton.click();
    await app.customFieldNameInput.fill('LinkedIn Profile');
    await app.screenDropdown.click();
    await app.screenOption.click();
    await app.typeDropdown.click();
    await app.typeOption.click();
    await app.saveCustomFieldButton.click();

    // Logout
    await app.userDropdown.click();
    await app.logoutButton.click();

  } catch (error) {
    console.error('Test failed at step:', error.message);
    throw error;
  }
});
