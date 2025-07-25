// pages/orangeHRMPage.js
const { expect } = require('@playwright/test');

exports.OrangeHRMPage = class OrangeHRMPage {
  constructor(page) {
    this.page = page;

    // Login alanları
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton   = page.locator('button[type="submit"]');

    // Dashboard kontrolü
    this.dashboardheader = page.locator('[data-menu-id="dashboard"]');

    // PIM (çalışan ekleme) alanları
    this.pimMenu     = page.locator('a[href="/web/index.php/pim/viewPimModule"]');
    this.addButton   = page.locator('button:has-text("Add")');
    this.firstName   = page.locator('input[name="firstName"]');
    this.lastName    = page.locator('input[name="lastName"]');
    this.empIdInput  = page.locator('div.oxd-form-row input').nth(2);
    this.saveButton  = page.locator('button[type="submit"]');
    this.personalDetailsHeader = page.locator('h6:has-text("Personal Details")');

    // Admin ▸ User Management alanları
    this.adminMenu          = page.locator('a[href="/web/index.php/admin/viewAdminModule"]');
    this.userManagementTab  = page.locator('a:has-text("User Management")');
    this.addUserButton      = page.locator('button:has-text("+ Add")');
    this.usernameSearchBox  = page.locator('input[placeholder="Username"]');
    this.searchBtn          = page.locator('button:has-text("Search")');
    this.resetBtn           = page.locator('button:has-text("Reset")');
    this.userTableRows      = page.locator('div.oxd-table-card');
    this.firstRowDeleteIcon = this.userTableRows.first().locator('button[title="Delete"]');
    this.confirmDeleteBtn   = page.locator('button:has-text("Yes, Delete")');

    // Profil çıkışı
    this.userDropdown   = page.locator('span.oxd-userdropdown-tab');
    this.logoutButton   = page.locator('a:has-text("Logout")');
  }

  async gotoLoginPage() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
   await this.dashboardheader.waitFor({ state: 'visible', timeout: 60000 });
  }
  async addEmployee(first, last) {
    await this.pimMenu.click();
    await this.addButton.click();
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    const empId = await this.empIdInput.inputValue();
    await this.saveButton.click();
    await expect(this.personalDetailsHeader).toBeVisible({ timeout: 10000 });
    return empId;
  }

  async goToUserManagement() {
    await this.adminMenu.click();
    await this.userManagementTab.click();
    await expect(this.addUserButton).toBeVisible({ timeout: 10000 });
  }

  async searchUser(username) {
    await this.usernameSearchBox.fill(username);
    await this.searchBtn.click();
    await expect(this.userTableRows.first()).toBeVisible({ timeout: 5000 });
  }

  async deleteFirstUser() {
    await this.firstRowDeleteIcon.click();
    await this.confirmDeleteBtn.click();
    await this.resetBtn.click();
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutButton.click();
    await expect(this.page).toHaveURL(/auth\/login$/, { timeout: 10000 });
  }
};
