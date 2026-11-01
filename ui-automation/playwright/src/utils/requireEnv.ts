import { test } from '@playwright/test';

export function requireEnv(testRunner: typeof test, ...names: string[]): void {
    const missing = names.filter((name) => !process.env[name]);
    testRunner.skip(
        missing.length > 0,
        `Missing env vars: ${missing.join(', ')} (add them as repository secrets or to .env)`
    );
}