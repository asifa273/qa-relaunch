import { test as baseTest } from '@playwright/test';


export const customtest = baseTest.extend<{
    testDataForOrder: {
        differentEmail: string;
        differentPassword: string;
        EVENTS_EMAIL: string;
        EVENTS_PASSWORD: string;
        GMAIL_EMAIL: string;
        GMAIL_PASSWORD: string;
    };
}>({
    testDataForOrder: async ({ }, use) => {
        // Values come from .env / GitHub secrets; empty strings let specs skip when unset.
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
