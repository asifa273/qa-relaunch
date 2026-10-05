const { test: base } = require('@playwright/test');

exports.customtest = base.extend({
    testDataForOrder: {
        differentEmail: 'anshika@gmail.com',
        differentPassword: 'Iamking@000',
        EVENTS_EMAIL: 'student@example.com',
        EVENTS_PASSWORD: 'secret123',
        GMAIL_EMAIL: 'student786@gmail.com',
        GMAIL_PASSWORD: 'secret123*',
        EVENTS_EMAIL: 'student@example.com',
        EVENTS_PASSWORD: 'secret123'
    }
});
