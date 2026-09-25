package com.qa.framework.listeners;

import org.testng.IRetryAnalyzer;
import org.testng.ITestResult;

/**
 * Re-runs a failed test up to MAX_RETRY times.
 *
 * INTERVIEW WARNING: say out loud that retries are a triage tool, not a fix. You retry
 * to keep the pipeline signal usable while you investigate, and you track which tests
 * retry so genuine flakiness gets fixed rather than hidden.
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
