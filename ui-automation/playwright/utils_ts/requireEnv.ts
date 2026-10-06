import { test } from '@playwright/test';

/**
 * Skip the current test (or every test in the file, when called at file scope)
 * if any required environment variable is missing. Credentials come from
 * GitHub Actions secrets in CI or from a local .env file.
 */
export function requireEnv(testRunner: typeof test, ...names: string[]) {
  const missing = names.filter((name) => !process.env[name]);

  testRunner.skip(
    missing.length > 0,
    `Missing env vars: ${missing.join(', ')} (add them as repository secrets or to .env)`
  );
}