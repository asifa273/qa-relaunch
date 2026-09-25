# 04 — Manual Testing Pack

The JD lists manual test planning, execution, and exploratory testing **twice** — once
under responsibilities and again under required skills. That is not filler; they want
someone who can do both. This is the artifact you bring to prove it, and it's the part of
the JD you're strongest on.

---

## Test Plan — Checkout Module (IEEE-829 shape, one page)

**1. Scope**
In scope: login/authentication, product listing and sort, cart add/remove, checkout
information, order summary and total calculation, order confirmation.
Out of scope: payment gateway internals (third-party, covered by vendor contract tests),
CMS content authoring, email delivery infrastructure.

**2. Test approach**
Risk-based. The checkout path carries revenue, so it gets the deepest coverage plus
automated regression on every build. Sort and filter are lower risk and get automated
happy-path plus periodic exploratory. Accessibility validated with Axe plus screen-reader
spot checks on the checkout path only.

**3. Entry criteria**
- Build deployed to QA and smoke suite green
- All acceptance criteria documented and reviewed for testability
- Test data seeded; test accounts provisioned
- No open blockers from the previous cycle

**4. Exit criteria**
- 100% of planned cases executed
- Zero open Critical or High defects; Medium defects triaged with owner and target release
- Regression suite pass rate ≥ 95%, every failure explained
- Requirements traceability matrix complete — every AC maps to ≥1 executed case

**5. Test types**
Functional · Integration (UI↔API↔DB) · System · Regression · Smoke · Sanity ·
Exploratory · Cross-browser (Chrome, Firefox, Edge) · Responsive (mobile web) ·
Accessibility (WCAG 2.1 AA on checkout)

**6. Environments**
Dev (unit/component) → QA (functional + automation) → Staging (regression, prod-like data)
→ Pre-prod (UAT, sign-off) → Production (post-deploy smoke)

**7. Risks and mitigation**

| Risk | Impact | Mitigation |
|---|---|---|
| Third-party payment sandbox unstable | Blocks E2E execution | Mock/stub layer; schedule real-gateway runs |
| Test data drift between environments | False failures | Seed script run before each cycle |
| Late requirement changes | Rework, missed coverage | Attend refinement; review ACs for testability up front |
| Suite runtime exceeds deploy window | Gate gets bypassed | Parallel execution; split smoke from regression |

**8. Deliverables**
Test plan · test cases in Zephyr/JIRA · RTM · defect reports · daily execution status ·
automation coverage report · release readiness summary with go/no-go recommendation

---

## Test Cases — Checkout (the format to write on a whiteboard)

| ID | Title | Precondition | Steps | Expected | Priority | Type |
|---|---|---|---|---|---|---|
| TC-CHK-001 | Complete purchase with one item | Valid user, cart empty | 1. Login 2. Add item 3. Open cart 4. Checkout 5. Enter name/zip 6. Continue 7. Finish | Confirmation "Thank you for your order!"; cart resets to 0 | P1 | Functional |
| TC-CHK-002 | Total equals subtotal + tax | Item in cart | 1–6 above 2. Read subtotal, tax, total | total == subtotal + tax to 2dp | P1 | Functional |
| TC-CHK-003 | First name mandatory | At checkout step 1 | Leave first name blank, Continue | Error "First Name is required"; no navigation | P1 | Negative |
| TC-CHK-004 | Postal code accepts intl formats | At checkout step 1 | Enter "SW1A 1AA", "560001", "75034" | All accepted | P2 | Boundary |
| TC-CHK-005 | Checkout blocked with empty cart | Cart empty | Navigate directly to /checkout-step-one | Blocked or redirected to cart | P2 | Negative |
| TC-CHK-006 | Cart survives session refresh | 2 items in cart | Refresh browser | Cart still shows 2 items | P2 | Functional |
| TC-CHK-007 | Back button after order placed | Order confirmed | Press browser Back | Order not duplicated | P1 | Negative |
| TC-CHK-008 | Price displayed = price charged | Item in cart | Compare listing price to cart line to order summary | Identical at all three points | P1 | Integration |
| TC-CHK-009 | Checkout on 375px viewport | Mobile emulation | Full flow | All fields and CTA reachable without horizontal scroll | P1 | Responsive |
| TC-CHK-010 | Checkout keyboard-only | Screen reader on | Tab through the flow | All controls reachable and labelled | P2 | Accessibility |

**TC-CHK-007 and TC-CHK-009 are your "shows experience" cases.** Duplicate-order-on-back is
a real revenue defect, and TC-CHK-009 is the same class of issue as the below-the-fold
payment section you found on the donation platform. Mention that connection out loud.

---

## Exploratory testing charters

Session-based format: **Explore [target] with [resources] to discover [information]**,
timeboxed to 60–90 minutes with notes.

1. Explore **the cart across sessions** with *multiple tabs and a browser refresh* to
   discover **state-persistence and race-condition defects**.
2. Explore **checkout form validation** with *paste, emoji, 500-character strings, leading
   and trailing spaces, and SQL-ish input* to discover **input-handling and injection gaps**.
3. Explore **the mobile web checkout** on *a real phone, one-handed, on a throttled
   connection* to discover **reachability, tap-target, and timeout defects**.
4. Explore **price and total consistency** across *listing, cart, summary, confirmation, and
   the database row* to discover **rounding and data-integrity mismatches**.
5. Explore **the back and forward buttons and direct URL entry** across *every step of
   checkout* to discover **navigation-state and duplicate-submission defects**.

Heuristics worth naming aloud: **CRUD**, boundary values, equivalence partitioning,
**decision tables** for combination logic, **state transition** for the cart lifecycle,
error guessing, and the **SFDPOT** touring mnemonic (Structure, Function, Data, Platform,
Operations, Time).

---

## Bug report template

```
TITLE: [Module] Short statement of what breaks and where
        e.g. "Checkout — order total omits tax when cart contains 3+ items"

SEVERITY: Critical | High | Medium | Low        PRIORITY: P1 | P2 | P3
ENVIRONMENT: QA / build 4.2.1 / Chrome 129 / macOS 15 / iPhone 14 Safari
TEST DATA: standard_user, cart = Backpack + Bike Light + Onesie

PRECONDITION: User logged in with 3 items in cart

STEPS TO REPRODUCE:
1. Open cart and click Checkout
2. Enter Priya / Sharma / 560001, click Continue
3. Read the Price Total block

EXPECTED: Total = Item total + Tax  (45.97 + 3.68 = 49.65)
ACTUAL:   Total = 45.97 — tax line displayed but not added

FREQUENCY: 3/3 attempts, reproducible
EVIDENCE: screenshot, HAR capture, SQL: SELECT total_amount FROM orders WHERE order_id=1001
IMPACT: Every multi-item order under-charges; direct revenue loss
WORKAROUND: None
SUSPECTED ROOT CAUSE: totals recalculated before tax service responds (see request timing in HAR)
```

The last two lines are what separate a senior report from a junior one — and grouping
related defects by shared root cause, the way you did on the donation platform, is the story
to tell when they ask what makes a good bug report.

---

## Severity guide

| Level | Definition | Example |
|---|---|---|
| Critical | Blocks core business function; no workaround | Cannot complete any purchase |
| High | Major function broken or wrong data; workaround painful | Tax not added to total |
| Medium | Function impaired, reasonable workaround | Sort resets after returning from cart |
| Low | Cosmetic or minor | Button label misaligned by 2px |
