package com.qa.framework.listeners;

import org.testng.IRetryAnalyzer;
import org.testng.ITestResult;

/**
 * Re-runs a failed test up to MAX_RETRY times.
 *
 * Retries are a triage tool, not a fix: they keep the pipeline signal usable while a
 * flaky test is investigated, and retried tests are tracked so genuine flakiness gets
 * fixed rather than hidden.
 */
public class RetryAnalyzer implements IRetryAnalyzer {

    private static final int MAX_RETRY = 1;
    private int count = 0;

    @Override
    public boolean retry(ITestResult result) {
        if (count < MAX_RETRY) {
            count++;
            return true;
        }
        return false;
    }
}
