import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';

// Use this project's .env if present, otherwise fall back to the shared one in ui-automation/playwright.
dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });
dotenv.config({ path: path.resolve(__dirname, '../.env'), quiet: true });

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 1,
    // Tests share one shop account and cart, so run them one at a time.
    workers: process.env.CI ? 1 : 2,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL: process.env.BASE_URL ?? 'https://parabank.parasoft.com/parabank/',
        headless: !!process.env.CI,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        { name: 'setup', testMatch: /.*\.setup\.ts/ },

        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
            dependencies: ['setup'],

        },
    ],
});
