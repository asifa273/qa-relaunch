const { test: base, expect, request } = require('@playwright/test');
const { POManager } = require('../pages');

/**
 * Shared fixtures:
 *  - poManager: page-object manager bound to the test's page
 *  - shopCredentials: primary and alternate shop logins from .env / CI secrets
 */
const test = base.extend({
    poManager: async ({ page }, use) => {
        await use(new POManager(page));
    },
    shopCredentials: async ({}, use) => {
        await use({
            email: process.env.SHOP_EMAIL ?? '',
            password: process.env.SHOP_PASSWORD ?? '',
            altEmail: process.env.SHOP_ALT_EMAIL ?? '',
            altPassword: process.env.SHOP_ALT_PASSWORD ?? '',
        });
    },
});

module.exports = { test, expect, request };
