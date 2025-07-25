const { test, expect } = require('@playwright/test');
const { JobSettingsPage } = require('../pages/jobSettingsPage');

test('Admin Job Settings: Add Employment Status and Job Category', async ({ page }) => {
  const jobSettings = new JobSettingsPage(page);

  await jobSettings.login('Admin', 'admin123');

  // Employment Status ekle
  const employmentStatus = 'Freelancer ' + Date.now();
  await jobSettings.navigateToEmploymentStatus();
  await jobSettings.addEmploymentStatus(employmentStatus);

  // Job Category ekle
  const jobCategory = 'Remote Workers ' + Date.now();
  await jobSettings.navigateToJobCategory();
  await jobSettings.addJobCategory(jobCategory);

  await jobSettings.logout();
});
