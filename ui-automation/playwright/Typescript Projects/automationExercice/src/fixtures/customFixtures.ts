import { APIRequestContext, test as base, expect, type Page } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import { error } from 'console';
import { HeaderComponent } from '../pages/components/header.component';



// 1. Declare the type framework container for your Page Objects
type PageFixtures = {
    /** A page that is already logged in (token injected before the app loads). */
    authPage: AuthPage;
    authenticatedPage: Page;
    authenticatedRequest: APIRequestContext;
};

type WorkerFixtures = {
    authStorageState: string;
};

export const test = base.extend<PageFixtures, WorkerFixtures>({

    page:
        async ({ page }, use) => {
            await page.route(/googlesyndication|doubleclick|fundingchoicesmessages|adservice/,
                (route) => route.abort());
            await use(page);
        },

    authPage:
        async ({ page }, use) => {
            await use(new AuthPage(page));
        },

    authStorageState: [
        async ({ browser }, use, workerInfo) => {
            const email = process.env.EMAIL;
            const password = process.env.PASSWORD;

            if (!email || !password) {
                throw new Error('Set email password in ur .env');

            }

            const storagePath = path.resolve(
                __dirname, `../payment-automation/test-results/.auth-worker-${workerInfo.workerIndex}.json`);
            //create  browser context and authenticate once

            const context = await browser.newContext();
            const page = await context.newPage();

            await page.route(/googlesyndication|doubleclick|fundingchoicesmessages|adservice/,
                (route) => route.abort());

            const authPage = new AuthPage(page);
            await authPage.goTo();
            await authPage.login(email!, password!);

            //save cookies and localStorage
            await context.storageState({ path: storagePath });
            await context.close();
            await use(storagePath);
            //tear down : delete temporary session file
            if (fs.existsSync(storagePath)) {
                fs.unlinkSync(storagePath);
            }
        },
        { scope: 'worker' },
    ],

    authenticatedPage: async ({ browser, authStorageState }, use) => {

        const context = await browser.newContext({ storageState: authStorageState });
        const page = await context.newPage();

        await page.route(/googlesyndication|doubleclick|fundingchoicesmessages|adservice/,
            (route) => route.abort());
        await use(page);
        await context.close();
    },
    // Add authenticatedRequest fixture using the worker's storageState
    authenticatedRequest: async ({ playwright, authStorageState, baseURL }, use) => {
        const apiContext = await playwright.request.newContext({
            baseURL,
            storageState: authStorageState,
        });
        await use(apiContext);
        // Clean up the request context after the test finishes
        await apiContext.dispose();
    },
});
export { expect };