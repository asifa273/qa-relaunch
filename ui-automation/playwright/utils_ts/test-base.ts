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
        await use({
            differentEmail: 'anshika@gmail.com',
            differentPassword: 'Iamking@000',
            EVENTS_EMAIL: 'student@example.com',
            EVENTS_PASSWORD: 'secret123',
            GMAIL_EMAIL: 'student786@gmail.com',
            GMAIL_PASSWORD: 'secret123*',
        });
    },
});
