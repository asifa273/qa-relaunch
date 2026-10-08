const { test: base } = require('@playwright/test');

// Values come from .env / GitHub secrets; empty strings let specs skip when unset.
exports.customtest = base.extend({
    testDataForOrder: async ({}, use) => {
        await use({
            differentEmail: process.env.SHOP_ALT_EMAIL ?? '',
            differentPassword: process.env.SHOP_ALT_PASSWORD ?? '',
            EVENTS_EMAIL: process.env.EVENTS_EMAIL ?? '',
            EVENTS_PASSWORD: process.env.EVENTS_PASSWORD ?? '',
            GMAIL_EMAIL: process.env.GMAIL_EMAIL ?? '',
            GMAIL_PASSWORD: process.env.GMAIL_PASSWORD ?? '',
        });
    },
});
