import json
import os
from datetime import datetime
from analyzer import analyze_defect
from fix_generator import generate_fix
from validator import run_validations


def generate_report():
    with open("defects/sample_bug.json") as f:
        bugs = json.load(f)

    os.makedirs("reports", exist_ok=True)

    for bug in bugs:
        print(f"Processing {bug['defect_id']}...")
        analysis = analyze_defect(bug)
        fix = generate_fix(bug, analysis)
        validations = [v for v in run_validations() if v["defect_id"]
                       == bug["defect_id"]]
        all_passed = all(v["passed"] for v in validations)

        report = f"""# Defect Resolution Report

**Defect ID:** {bug['defect_id']}
**Title:** {bug['title']}
**Severity:** {bug['severity']}
**Module:** {bug['module']}
**Date:** {datetime.now().strftime('%Y-%m-%d')}
**Status:** {'✅ RESOLVED' if all_passed else '❌ FAILED VALIDATION'}

---

## Root Cause Analysis
{analysis}

---

## AI-Generated Fix
{fix}

---

## Validation Results

| Defect | Input | Expected | Actual | Status |
|--------|-------|----------|--------|--------|
"""
        for v in validations:
            status = "✅ Pass" if v["passed"] else "❌ Fail"
            report += f"| {v['defect_id']} | {v['input']} | {v['expected']} | {v['actual']} | {status} |\n"

        filename = f"reports/{bug['defect_id'].lower().replace('-', '_')}_report.md"
        with open(filename, "w") as f:
            f.write(report)
        print(f"Report saved: {filename}")


if __name__ == "__main__":
    generate_report()
