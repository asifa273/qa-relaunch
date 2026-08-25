package com.asifa.banking.constants;

/**
 * AppConstants.java
 * Central home for every hardcoded value in the framework.
 * Rule: if it appears more than once anywhere in the project, it belongs here.
 */
public class AppConstants {

    // ── URLs ──────────────────────────────────────────────────────────────
    public static final String BASE_URL       = "https://demo.guru99.com/V4/";
    public static final String LOGIN_URL      = BASE_URL;
    public static final String DASHBOARD_URL  = BASE_URL + "index.php";

    // ── Test Credentials (demo site — safe to commit) ─────────────────────
    public static final String VALID_USERNAME  = "mngr658980";   // replace with your demo site ID
    public static final String VALID_PASSWORD  = "esUvube"; // replace with your demo site password
    public static final String INVALID_USERNAME = "wronguser";
    public static final String INVALID_PASSWORD = "wrongpass";

    // ── Timeouts (seconds) ────────────────────────────────────────────────
    public static final int IMPLICIT_WAIT     = 10;
    public static final int EXPLICIT_WAIT     = 15;
    public static final int PAGE_LOAD_TIMEOUT = 30;

    // ── Browser ───────────────────────────────────────────────────────────
    public static final String DEFAULT_BROWSER = "chrome";

    // ── Test Data — Accounts ──────────────────────────────────────────────
    public static final String ACCOUNT_TYPE_SAVINGS  = "Savings";
    public static final String ACCOUNT_TYPE_CURRENT  = "Current";
    public static final String INITIAL_DEPOSIT       = "5000";
    public static final String DEPOSIT_AMOUNT        = "1000";
    public static final String WITHDRAW_AMOUNT       = "500";
    public static final String TRANSFER_AMOUNT       = "200";

    // ── Expected Messages ─────────────────────────────────────────────────
    public static final String WELCOME_MSG_PREFIX     = "Manger Id :";
    public static final String LOGIN_ERROR_MSG        = "User or Password is not valid";
    public static final String NEW_ACCOUNT_SUCCESS    = "Account Generated Successfully!!!";
    public static final String DEPOSIT_SUCCESS        = "Transaction details of Deposit for Account";
    public static final String WITHDRAW_SUCCESS       = "Transaction details of Withdrawal for Account";
    public static final String DELETE_SUCCESS         = "Account Deleted Successfully";

    // ── Report Settings ───────────────────────────────────────────────────
    public static final String REPORT_PATH            = "reports/TestReport.html";
    public static final String REPORT_TITLE           = "QA Automation — Banking Suite";
    public static final String REPORT_NAME            = "Regression Test Results";

    // ── Screenshots ───────────────────────────────────────────────────────
    public static final String SCREENSHOT_PATH        = "reports/screenshots/";

    // Private constructor — this class should never be instantiated
    private AppConstants() {}
}