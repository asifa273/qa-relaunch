const { defineConfig } = require('@playwright/test');
const baseConfig = require('./playwright.config');

const serviceEnabled = !!process.env.PLAYWRIGHT_SERVICE_URL && !!process.env.PLAYWRIGHT_SERVICE_ACCESS_TOKEN;

let azureConfig = {};
let reporter = [['html', { open: 'never' }]];

if (serviceEnabled) {
  const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
  const { DefaultAzureCredential } = require('@azure/identity');

  azureConfig = createAzurePlaywrightConfig(baseConfig, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000,
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
  });

  reporter = [
    ['html', { open: 'never' }],
    ['@azure/playwright/reporter'],
  ];
}

module.exports = defineConfig({
  ...baseConfig,
  ...azureConfig,
  reporter,
});
