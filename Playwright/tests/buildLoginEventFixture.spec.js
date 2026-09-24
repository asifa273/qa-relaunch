
const { expect } = require('@playwright/test')
const { customtest } = require("./utils/EventsFixture.js");

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const newEvent =

    customtest('newly created event should appear on the events page', async ({ authenticatedEventsPage, testDataforOrder }) => {
        await authenticatedEventsPage.goto('https://eventhub.rahulshettyacademy.com/events');
        // await authenticatedEventsPage.goto(`${BASE_URL}/events/`, { waitUntil: 'networkidle' });
        await expect(authenticatedEventsPage.getByText(testDataforOrder.title)).toBeVisible();
        console.log(testDataforOrder.title);
        await authenticatedEventsPage.screenshot({ path: 'screenshot.png' });
        await authenticatedEventsPage.getByText(testDataforOrder.title).screenshot({ path: 'specificelementscreenshot.png' });
        expect(await authenticatedEventsPage.screenshot()).toMatchSnapshot('visualVerificationofthisTest.png');
    })
