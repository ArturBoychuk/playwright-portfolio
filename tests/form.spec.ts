import { test, expect } from '@playwright/test';
import { PageManager } from '../helpers/PageManager';

test.beforeEach( async ({page}) => {
  await page.goto('');
})

test('Filling form with valid data', async ({ page }) => {
    const pageManager = new PageManager(page)
    const formPage = pageManager.getFormPage()
    formPage.goToFormPage()
    await formPage.fillForm()
    await formPage.submitForm()
});


test('Filling form with invalid phone', async ({ page }) => {
  const pageManager = new PageManager(page)
  const formPage = pageManager.getFormPage()
  await formPage.goToFormPage()
  await formPage.fillFormWithInvalidPhone()
  await formPage.submitForm()
  await expect(page.locator('#userNumber-wrapper .form-control:invalid')).toBeVisible()
});
