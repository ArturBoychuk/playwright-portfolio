const { defineConfig } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  workers: process.env.CI ? 2 : undefined,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    baseURL: process.env.BASE_URL || 'https://demoqa.com',
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]],
});