// tests/main.spec.js
const { test } = require('@playwright/test');
const { OrangeHRMPage } = require('../../pages/orangeHRMPage');

test('OrangeHRM tüm akış: login, çalışan ekle, user ara, sil, logout', async ({ page }) => {
  const hrm = new OrangeHRMPage(page);

  await hrm.gotoLoginPage();
  await hrm.login('Admin', 'admin123');

  // Yeni çalışan ekle
  const empId = await hrm.addEmployee('Mert', 'Tuna');

  // Admin ▸ User Management’e git ve kullanıcı ara
  await hrm.goToUserManagement();
  await hrm.searchUser('Admin');

  // İlk listedeki kullanıcıyı sil (Admin silinemezse başka test için dene)
  // await hrm.deleteFirstUser();

  // Logout işlemi
  await hrm.logout();
});
