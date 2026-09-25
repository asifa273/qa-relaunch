# SQL QA Portfolio

A hands-on SQL learning portfolio built around regulatory data quality assurance workflows.
Each project simulates real QA tasks — validating data, detecting issues, and reconciling sources — using the same query patterns used in data QA roles.

**Learning path:** SQLBolt + Mode Analytics → applied to real QA scenarios  
**Database:** SQLite / PostgreSQL compatible  
**Status:** In progress — adding one project per phase

---

## Why this repo exists

Most SQL portfolios show generic queries against made-up sales data. This one is different — every project is built around what a **data QA analyst actually does**: finding nulls, catching duplicates, comparing source vs target counts, and producing daily audit reports.

The goal is to demonstrate that I can use SQL to validate data, not just retrieve it.

---

## Projects

| # | Project | Skills | Status |
|---|---------|--------|--------|
| 01 | [QA Test Results Daily Summary](#project-01--qa-test-results-daily-summary) | GROUP BY, JOINs, CASE WHEN, UNION ALL, Window Functions | ✅ Complete |
| 02 | Source-to-Target Reconciliation | CTEs, UNION ALL, aggregates | 🔜 Coming |
| 03 | Data Quality Scorecard | Comprehensive DQ checks, CASE WHEN | 🔜 Coming |

---

## Project 01 — QA Test Results Daily Summary

Simulates a QA test run tracking system with 36 rows of run history across DEV, QA, UAT, and PROD environments. Includes intentional failures and notes to make the queries meaningful.

### Schema

```
environments
    │
    └── test_runs ── test_cases
```

| Table | Description |
|-------|-------------|
| `environments` | DEV, QA, UAT, PROD |
| `test_cases` | Individual tests with category and priority |
| `test_runs` | Each test execution — status, row count, notes, duration |

### Files

```
project-01-test-results/
    01_schema.sql       ← creates the 3 tables
    02_seed_data.sql    ← 36 rows of realistic fake run history
    03_queries.sql      ← 7 queries covering Phase 2–3 SQL skills
    README.md
```

### Queries

| # | What it answers | SQL concepts |
|---|----------------|--------------|
| 1 | Daily pass/fail/skip summary | `GROUP BY`, `COUNT` |
| 2 | All failures with test name and notes | `INNER JOIN`, `WHERE` |
| 3 | Pass rate by test category | `GROUP BY`, `CASE WHEN`, `ROUND` |
| 4 | Test counts by environment | `UNION ALL` |
| 5 | Tests that have never passed | Subquery, `NOT IN` |
| 6 | Row count drift between runs | `LAG()` window function |
| 7 | Full data quality scorecard in one query | Comprehensive `CASE WHEN` |

### How to run

**Option 1 — Browser (no install)**
1. Go to [db-fiddle.com](https://db-fiddle.com)
2. Set dialect to **SQLite**
3. Paste `01_schema.sql` + `02_seed_data.sql` into the left panel
4. Paste any query from `03_queries.sql` into the right panel
5. Click **Run**

**Option 2 — SQLite CLI**
```bash
sqlite3 qa_results.db < 01_schema.sql
sqlite3 qa_results.db < 02_seed_data.sql
sqlite3 qa_results.db < 03_queries.sql
```

**Option 3 — PostgreSQL**
The SQL is compatible with PostgreSQL with no changes needed.

---

## Skills being built

| Phase | Topics | Resource |
|-------|--------|----------|
| Foundation | SELECT, WHERE, ORDER BY, basic functions | SQLBolt lessons 1–5 |
| Intermediate | JOINs, GROUP BY, CASE WHEN, Subqueries, UNION ALL | SQLBolt lessons 6–12, Mode Analytics |
| Advanced | Window functions, CTEs, query optimization | PostgreSQL docs |
| QA Specialist | Reconciliation, DQ checks, drift detection, auditable SQL | Applied in projects |

---

## About

Self-directed SQL learning focused on regulatory data quality assurance.  
Building toward roles in data QA, ETL validation, and regulatory reporting.

Feedback welcome — open an issue or reach out directly.
