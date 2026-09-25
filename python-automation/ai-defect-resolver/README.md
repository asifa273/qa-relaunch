# 🤖 AI Defect Resolver

> An AI-driven defect resolution workflow tool that mirrors real-world software quality engineering — powered by the Claude API.

---

## 📌 What This Project Does

**AI Defect Resolver** automates the core loop of software defect resolution:

```
Bug Report → AI Root Cause Analysis → AI-Generated Fix → Validation → Resolution Report
```

Instead of manually diagnosing every bug, this tool uses the **Claude AI API** to:
1. **Analyze** the defect and identify the root cause
2. **Generate** a corrected version of the buggy code
3. **Validate** the fix through automated pytest assertions
4. **Document** the resolution in a structured markdown report

---

## 🗂️ Project Structure

```
ai-defect-resolver/
├── README.md                       ← You are here
├── requirements.txt                ← Python dependencies
├── defects/
│   └── sample_bug.json             ← Sample defect input
├── src/
│   ├── analyzer.py                 ← Sends bug to Claude API, returns root cause
│   ├── fix_generator.py            ← Asks Claude API to generate a code fix
│   ├── validator.py                ← Runs pytest assertions to validate the fix
│   └── reporter.py                 ← Auto-generates a resolution markdown report
├── reports/
│   └── defect_001_report.md        ← Sample output report
├── tests/
│   └── test_validator.py           ← pytest test suite
└── .github/
    └── workflows/
        └── ci.yml                  ← GitHub Actions CI pipeline
```

---

## ⚙️ How It Works

### Step 1 — Defect Input
A bug is described in a structured JSON format:

```json
{
  "defect_id": "DEF-001",
  "title": "Checkout total incorrect when discount applied",
  "description": "When a 10% discount coupon is applied, the total shows the pre-discount amount.",
  "severity": "High",
  "module": "checkout_service.py",
  "code_snippet": "def apply_discount(total, discount): return total - discount"
}
```

### Step 2 — AI Root Cause Analysis (`analyzer.py`)
The bug is sent to the Claude API with a structured prompt. Claude returns:
- Root cause explanation
- Impact assessment
- Suggested fix approach

### Step 3 — AI Fix Generation (`fix_generator.py`)
Based on the root cause analysis, Claude generates a corrected version of the code with an explanation of the change.

### Step 4 — Validation (`validator.py`)
The fix is validated against test cases using Python assertions:

```
✅ Test Case 1: total=100, discount=10% → Expected: 90.0 | Actual: 90.0 | PASS
✅ Test Case 2: total=200, discount=20% → Expected: 160.0 | Actual: 160.0 | PASS
```

### Step 5 — Resolution Report (`reporter.py`)
A structured markdown report is auto-generated and saved to `/reports/`:

```markdown
# Defect Resolution Report
**Defect ID:** DEF-001
**Status:** ✅ RESOLVED
## Root Cause Analysis
...
## AI-Generated Fix
...
## Validation Results
| Test Case | Expected | Actual | Status |
...
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/asifa273/qa-relaunch.git
cd qa-relaunch/ai

# Install dependencies
pip install -r requirements.txt

# Set your API key
export ANTHROPIC_API_KEY="your_api_key_here"
```

### Run the Defect Resolver

```bash
python src/analyzer.py
python src/fix_generator.py
python src/validator.py
python src/reporter.py
```

### Run Tests

```bash
pytest tests/ -v
```

---

## 🔁 CI/CD Pipeline

This project includes a **GitHub Actions** workflow that automatically runs on every push and pull request:

- ✅ Sets up Python 3.11
- ✅ Installs all dependencies
- ✅ Runs the full pytest test suite
- ✅ Reports pass/fail status on every commit

See `.github/workflows/ci.yml` for the full configuration.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| Python 3.11 | Core language |
| Claude API (Anthropic) | AI-driven root cause analysis & fix generation |
| pytest | Fix validation & automated testing |
| GitHub Actions | CI/CD pipeline |
| JSON | Defect input format |
| Markdown | Resolution report output |

---

## 📄 Sample Output

See [`reports/defect_001_report.md`](reports/defect_001_report.md) for a full example of an AI-generated defect resolution report.

---

## 💡 Why This Project

This tool was built to demonstrate an **AI-driven defect resolution workflow** — the same core loop used in modern software quality engineering roles:

- Take a defect
- Use AI to find the root cause
- Generate and validate a fix
- Document the resolution clearly

It mirrors real-world QA practices using AI tooling, CI/CD integration, and structured documentation.

---

## 👩‍💻 Author

**Asifa Begum**
QA Engineer | AI-Driven Defect Resolution
[LinkedIn](https://www.linkedin.com/in/asifa-begum-qa/) · [GitHub](https://github.com/asifa273/qa-relaunch/tree/main/ai)