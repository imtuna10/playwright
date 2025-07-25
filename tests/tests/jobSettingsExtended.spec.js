const { test, expect } = require('@playwright/test');
const { JobSettingsPage } = require('../pages/jobSettingsPage1');

test('Admin Job Settings: Add Employment Status, Job Category, Job Title, Location, Pay Grade, Work Shift, User Role', async ({ page }) => {
  const jobSettings = new JobSettingsPage(page);

  await jobSettings.login('Admin', 'admin123');

  // Employment Status
  const employmentStatus = 'Freelancer ' + Date.now();
  await jobSettings.navigateToEmploymentStatus();
  await jobSettings.addEmploymentStatus(employmentStatus);

  // Job Category
  const jobCategory = 'Remote Workers ' + Date.now();
  await jobSettings.navigateToJobCategory();
  await jobSettings.addJobCategory(jobCategory);

  // Job Title
  const jobTitle = 'Full Stack Dev ' + Date.now();
  await jobSettings.navigateToJobTitle();
  await jobSettings.addJobTitle(jobTitle);

  // Location
  const location = 'Berlin Office ' + Date.now();
  await jobSettings.navigateToLocation();
  await jobSettings.addLocation(location);

  // Pay Grade
  const grade = 'Level 10 ' + Date.now();
  await jobSettings.navigateToPayGrades();
  await jobSettings.addPayGrade(grade);

  // Work Shift
  const shift = 'Evening Shift ' + Date.now();
  await jobSettings.navigateToWorkShifts();
  await jobSettings.addWorkShift(shift);

  // User Role
  const role = 'QA Intern ' + Date.now();
  await jobSettings.navigateToUserRoles();
  await jobSettings.addUserRole(role);

  await jobSettings.logout();
});
