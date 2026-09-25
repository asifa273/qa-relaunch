
const { expect } = require('@playwright/test');
const { customtest } = require("./utils/EventsFixture.js");

customtest('newly created event should appear on the events page', async ({ authenticatedEventsPage, createEvent }, testInfo) => {
    await authenticatedEventsPage.goto('https://eventhub.rahulshettyacademy.com/events');
    const eventTitle = authenticatedEventsPage.getByText(createEvent.title, { exact: true });

    await expect(eventTitle).toBeVisible();
    await authenticatedEventsPage.screenshot({ path: testInfo.outputPath('event-page.png') });
    await eventTitle.screenshot({ path: testInfo.outputPath('event-title.png') });
});
