import { expect, test as baseTest } from '@playwright/test';
import { GreenKartPOManager } from '../pages';

export { expect };

export const test = baseTest.extend<{
    greenKart: GreenKartPOManager;
}>({
    greenKart: async ({ page }, use) => {
        await use(new GreenKartPOManager(page));
    },
});