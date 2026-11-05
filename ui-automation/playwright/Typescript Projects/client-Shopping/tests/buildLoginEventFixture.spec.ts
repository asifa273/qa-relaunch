
import { eventsTest as customtest, expect } from '../src/fixtures';
import { requireEnv } from '../src/utils';

requireEnv(customtest, 'EVENTS_EMAIL', 'EVENTS_PASSWORD');


customtest('@Web newly created event should appear on the events page', async ({ authenticatedEventsPage, createEvent }, testInfo) => {
    await authenticatedEventsPage.goto('https://eventhub.rahulshettyacademy.com/events');
    const eventTitle = authenticatedEventsPage.getByText(createEvent.title, { exact: true });

    await expect(eventTitle).toBeVisible();
    await authenticatedEventsPage.screenshot({ path: testInfo.outputPath('event-page.png') });
    await eventTitle.screenshot({ path: testInfo.outputPath('event-title.png') });
});
