const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { EmployeePage } = require('../../pages/EmployeePage');

test('Add new employee and verify', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const employeePage = new EmployeePage(page);

  await page.goto('https://opensource-demo.orangehrmlive.com/');
  await loginPage.login('Admin', 'admin123');

  await employeePage.goToAddEmployee();
  await employeePage.fillEmployeeForm('John', 'Doe');
  await employeePage.save();

  await expect(employeePage.personalDetailsHeader).toBeVisible();
});
