class AppPage {
  constructor(page) {
    this.page = page;

    // Login
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');

    // User Management
    this.adminMenu = page.locator('a[href="/web/index.php/admin/viewAdminModule"]');
    this.addUserButton = page.locator('button:has-text("Add")');
    this.addUserHeader = page.locator('h6:has-text("Add User")');
    this.userRoleSelect = page.locator('div.oxd-select-text').nth(0);
    this.statusSelect = page.locator('div.oxd-select-text').nth(1);
    this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]');
    this.usernameField = page.locator('input[autocomplete="off"]').nth(1);
    this.passwordField = page.locator('input[type="password"]').nth(0);
    this.confirmPasswordField = page.locator('input[type="password"]').nth(1);
    this.saveUserButton = page.locator('button:has-text("Save")');
    this.searchInput = page.locator('input[placeholder="Type for hints..."]').first();
    this.searchButton = page.locator('button.oxd-button--secondary.orangehrm-left-space');
    this.resetButton = page.locator('button.oxd-button--ghost');

    // Job Titles
    this.adminJobTab = page.locator('span[class*="oxd-topbar-body-nav-tab-item"]').nth(1);
    this.jobTitleMenu = page.locator('li.--active.oxd-topbar-body-nav-tab.--parent > ul > li:nth-child(1) > a');
    this.addJobTitleButton = page.locator('div.orangehrm-header-container button');
    this.jobTitleInput = page.locator('input.oxd-input').first();
    this.jobDescInput = page.locator('textarea[placeholder="Type description here"]');
    this.jobNoteInput = page.locator('form div:nth-child(4) textarea');
    this.saveJobButton = page.locator('form div.oxd-form-actions button[type="submit"]');

    // Pay Grades
    this.payGradesMenu = page.locator('li.--active.oxd-topbar-body-nav-tab.--parent.--visited > ul > li:nth-child(2) > a');
    this.addPayGradeButton = page.locator('div.orangehrm-header-container button');
    this.payGradeNameInput = page.locator('form .oxd-form-row input');
    this.savePayGradeButton = page.locator('form div.oxd-form-actions button[type="submit"]');

    // Custom Fields
    this.pimMenu = page.locator('aside nav ul > li:nth-child(2) > a > span');
    this.configTab = page.locator('span.oxd-topbar-body-nav-tab-item', { hasText: 'Configuration' });
    this.customFieldsMenu = page.locator('li.--active.oxd-topbar-body-nav-tab.--parent > ul > li:nth-child(2) > a');
    this.addCustomFieldButton = page.locator('div.orangehrm-header-container > button');
    this.customFieldNameInput = page.locator('form div.organization-name-container input');
    this.screenDropdown = page.locator('form div:nth-child(1) > div > div:nth-child(2) .oxd-select-text--after');
    this.screenOption = page.locator('div[role="option"]').nth(1);
    this.typeDropdown = page.locator('.oxd-select-text--after').nth(1);
    this.typeOption = page.locator("div[role='option']:has-text('Text or Number')");
    this.saveCustomFieldButton = page.locator('form .oxd-form-actions button.oxd-button--secondary');

    // Logout
    this.userDropdown = page.locator('span.oxd-userdropdown-tab');
    this.logoutButton = page.locator('a[href="/web/index.php/auth/logout"]');
  }
}

module.exports = { AppPage };
