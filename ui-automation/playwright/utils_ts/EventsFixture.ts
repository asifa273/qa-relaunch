import { test as baseTest, Page } from '@playwright/test';
import 'dotenv/config';
declare const process: any;

interface EventData {
    id?: string;
    title: string;
    description: string;
    category: string;
    city: string;
    venue: string;
    eventDate: string;
    price: number;
    totalSeats: number;
    imageUrl: string;
    [key: string]: unknown;
}

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_BASE_URL = 'https://api.eventhub.rahulshettyacademy.com';

const eventsUser = {
    email: process.env.EVENTS_EMAIL ?? '',
    password: process.env.EVENTS_PASSWORD ?? '',
};

export const customtest = baseTest.extend<{
    authenticatedEventsPage: Page;
    createEvent: EventData;
}>({
    // Task 1: UI login fixture — reuse Playwright's built-in `page`
    authenticatedEventsPage: async ({ page }, use) => {
        await page.goto(`${BASE_URL}/login`);
        await page.getByRole('textbox', { name: 'Email' }).fill(eventsUser.email);
        await page.getByRole('textbox', { name: 'Password' }).fill(eventsUser.password);
        await page.locator('#login-btn').click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('link', { name: 'Events' }).first().click();

        await use(page);
    },

    // Task 2: API event-creation fixture
    createEvent: async ({ playwright }, use) => {
        const apiContext = await playwright.request.newContext({ baseURL: API_BASE_URL });

        const loginRes = await apiContext.post('/api/auth/login', { data: eventsUser });
        if (!loginRes.ok()) {
            throw new Error(`Events login failed (${loginRes.status()}): ${await loginRes.text()}`);
        }
        const { token } = await loginRes.json();

        const eventPayload: EventData = {
            title: 'Tech Summit 2026',
            description: 'A premier technology conference.',
            category: 'Conference',
            city: 'Bangalore',
            venue: 'Bangalore International Centre',
            eventDate: '2027-06-15T09:00:00.000Z',
            price: 1500.0,
            totalSeats: 500,
            imageUrl: 'https://example.com/banner.jpg',
        };

        const createRes = await apiContext.post('/api/events', {
            data: eventPayload,
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!createRes.ok()) {
            throw new Error(`Event creation failed (${createRes.status()}): ${await createRes.text()}`);
        }
        const { data: event } = await createRes.json();

        await use(event);
        await apiContext.dispose();
    },
});