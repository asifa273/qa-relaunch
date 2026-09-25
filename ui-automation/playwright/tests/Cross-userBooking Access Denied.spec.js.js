const { test, expect, request } = require('@playwright/test');
const Yahoo_user = { email: "student098@yahoo.com", password: "secretyahoo123" };
const gmail_user = { email: "student098@gmail.com", password: "secretgmail123" };
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = `${BASE_URL}/api`;


async function loginAs(page, user) {
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel('Email').fill(user.email);
    await page.getByLabel('Password').fill(user.password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
    await page.goto(`${BASE_URL}/events`);
}
//Step 1 — Login as Yahoo user via API  -
test('gmail user sees Access Denied when viewing yahoo user booking', async ({ page, request }) => {
    const loginRes = await request.post(`${API_URL}/auth/login`, {
        data: { email: Yahoo_user.email, password: Yahoo_user.password },
    });
    expect(loginRes.ok()).toBeTruthy();
    const { token } = await loginRes.json();

    
    //Step 2 — Fetch events via API to get a valid event ID
    const getEvents = await request.get(`${API_URL}/events`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    expect(loginRes.ok()).toBeTruthy();
    const eventsdataread = await getEvents.json();
    const eventId = eventsdataread.data[0].id;

    //Step 3 — Create a booking via API as Yahoo user
    const createBook = await request.post(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
            eventId,
            customerName: 'Yahoo user',
            customerEmail: Yahoo_user.email,
            customerPhone: '1234567890',
            quantity: 1,
        },
    });

    expect(createBook.ok()).toBeTruthy();
    const createBookJson = await createBook.json();
    const yahooBookingId = createBookJson.data.id;

    console.log(`yahoo booking via api: ${yahooBookingId}`);
    //Step 4 — Login as Gmail user via browser UI
    await loginAs(page, gmail_user);

    // Step 5 — Navigate to Yahoo's booking URL as Gmail user
    await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, { waitUntil: 'networkidle' });

    //Step 6 — Validate Access Denied
    await expect(page.getByText('Access Denied')).toBeVisible();
    await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();

});
