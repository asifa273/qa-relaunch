const { test: base, expect, request } = require('@playwright/test');
const events_user = { email: "REDACTED_EMAIL", password: "REDACTED_PASSWORD" };

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = `${BASE_URL}/api`;
const API_BASE_URL = 'https://api.eventhub.rahulshettyacademy.com';

// Task 1: UI login fixture — returns an already-authenticated page

exports.customtest = base.extend({
    //setup
    authenticatedEventsPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`${BASE_URL}/login`);
        await page.getByRole('textbox', { name: 'Email' }).fill(events_user.email);
        await page.getByRole('textbox', { name: 'Password' }).fill(events_user.password);
        await page.locator('#login-btn').click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('link', { name: 'Events' }).first().click();
        await use(page);
        await context.close();

    },

    // Task 2: API event-creation fixture — returns the created event's data
    createEvent: async ({ playwright }, use) => {
        const apiContext = await playwright.request.newContext({ baseURL: API_BASE_URL });

        // confirmed response shape: { success, token, user: { id, email } }
        const loginRes = await apiContext.post('api/auth/login', { data: events_user });
        const loginBody = await loginRes.json();
        const token = await loginBody.token;

        const posteventsResponse = {
            title: 'Tech Summit 2026',
            description: 'A premier technology conference.',
            category: 'Conference',
            city: 'Bangalore',
            venue: 'Bangalore International Centre',
            eventDate: '2026-06-15T09:00:00.000Z',
            price: 1500.00,
            totalSeats: 500,
            imageUrl: 'https://example.com/banner.jpg',
        };
        const createRes = await apiContext.post('/api/events', {
            data: posteventsResponse,
            headers: { Authorization: `Bearer ${token}` },
        });
        const body = await createRes.json();
        const event = body.data; // event object is nested under "data"

        await use(event);
        //teardown
        await apiContext.dispose();
    },
    testDataforOrder: {
        title: 'Tech Summit 2026'
    }
});