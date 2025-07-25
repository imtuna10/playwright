class JobSettingsPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.adminMenu = page.locator('a[href="/web/index.php/admin/viewAdminModule"]');
    this.jobMenu = page.getByText('Job');
    this.employmentStatusItem = page.getByRole('menuitem', { name: 'Employment Status' });
    this.jobCategoryItem = page.getByRole('menuitem', { name: 'Job Categories' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.inputField = page.locator('input.oxd-input.oxd-input--active');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutItem = page.getByRole('menuitem', { name: 'Logout' });
  }

  async login(username, password) {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToEmploymentStatus() {
    await this.adminMenu.click();
    await this.jobMenu.click();
    await this.employmentStatusItem.click();
  }

  async addEmploymentStatus(statusName) {
    await this.addButton.click();
    await this.inputField.first().fill(statusName);
    await this.saveButton.click();
  }

  async navigateToJobCategory() {
    await this.jobMenu.click();
    await this.jobCategoryItem.click();
  }

  async addJobCategory(categoryName) {
    await this.addButton.click();
    await this.inputField.first().fill(categoryName);
    await this.saveButton.click();
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutItem.click();
  }
}

module.exports = { JobSettingsPage };
