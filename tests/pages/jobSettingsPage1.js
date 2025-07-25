class JobSettingsPage {
  constructor(page) {
    this.page = page;

    // Ortak Login/logout ve menü elementleri
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.adminMenu = page.locator('a.oxd-main-menu-item:has-text("Admin")');
    this.jobMenu = page.locator('.oxd-topbar-body-nav span:has-text("Job")');
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.inputField = page.locator('input.oxd-input.oxd-input--active');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutItem = page.getByRole('menuitem', { name: 'Logout' });
    this.searchInput = page.getByPlaceholder('Search'); // 🔁 Arama kutusu

    // Menü elemanları
    this.employmentStatusItem = page.getByRole('menuitem', { name: 'Employment Status' });
    this.jobCategoryItem = page.getByRole('menuitem', { name: 'Job Categories' });
    this.jobTitleItem = page.getByRole('menuitem', { name: 'Job Titles' });
    this.locationItem = page.getByRole('menuitem', { name: 'Locations' });
    this.payGradeItem = page.getByRole('menuitem', { name: 'Pay Grades' });
    this.workShiftItem = page.getByRole('menuitem', { name: 'Work Shifts' });
    this.userRolesItem = page.getByRole('menuitem', { name: 'Users' });
  }

  async login(username, password) {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutItem.click();
  }

  // Employment Status
  async navigateToEmploymentStatus() {
    await this.adminMenu.click();
    await this.jobMenu.click();
    await this.employmentStatusItem.click();
  }

  async addEmploymentStatus(name) {
    await this.addButton.click();
    await this.inputField.first().fill(name);
    await this.saveButton.click();
    await this.searchInput.fill('');
  }

  // Job Category
  async navigateToJobCategory() {
    await this.jobMenu.click();
    await this.jobCategoryItem.click();
  }

  async addJobCategory(name) {
    await this.addButton.click();
    await this.inputField.first().fill(name);
    await this.saveButton.click();
    await this.searchInput.fill('');
  }

  // Job Title
  async navigateToJobTitle() {
    await this.jobMenu.click();
    await this.jobTitleItem.click();
  }

  async addJobTitle(name) {
    await this.addButton.click();
    await this.inputField.first().fill(name);
    await this.saveButton.click();
    await this.searchInput.fill('');
  }

  // Location
  async navigateToLocation() {
    await this.adminMenu.click();
    const orgMenu = this.page.getByText('Organization', { exact: true });
    await orgMenu.click();
    await this.locationItem.click();
  }

  async addLocation(name) {
    await this.addButton.click();
    await this.inputField.first().fill(name);
    await this.saveButton.click();
    await this.searchInput.fill('');
  }

  // Pay Grades
  async navigateToPayGrades() {
    await this.jobMenu.click();
    await this.payGradeItem.click();
  }

  async addPayGrade(name) {
    await this.addButton.click();
    await this.inputField.first().fill(name);
    await this.saveButton.click();
    await this.searchInput.fill('');
  }

  // Work Shifts
  async navigateToWorkShifts() {
    await this.jobMenu.click();
    await this.workShiftItem.click();
  }

  async addWorkShift(name) {
    await this.addButton.click();
    await this.inputField.first().fill(name);
    await this.saveButton.click();
    await this.searchInput.fill('');
  }

  // User Roles
  async navigateToUserRoles() {
    await this.adminMenu.click();
    await this.page.locator('span.oxd-topbar-body-nav-tab-item:has-text("User Management")').click();
    await this.userRolesItem.click();
  }

  async addUserRole(name) {
    await this.addButton.click();
    await this.inputField.first().fill(name);
    await this.saveButton.click();
    await this.searchInput.fill('');
  }
}

module.exports = { JobSettingsPage };
