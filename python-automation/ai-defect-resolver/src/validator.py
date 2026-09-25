def apply_discount_buggy(total, discount):
    return total - discount  # Bug: treats discount as flat amount


def apply_discount_fixed(total, discount_pct):
    return round(total * (1 - discount_pct / 100), 2)  # Fix: percentage


def calculate_points_buggy(card_amount, rate=1):
    return int(card_amount * rate)  # Bug: ignores cash portion


def calculate_points_fixed(total_amount, rate=1):
    return int(total_amount * rate)  # Fix: uses full total


def process_refund_buggy(amount, tax):
    # Bug: double tax
    return {"refund": -amount, "tax": -tax, "tax_summary": -tax}


def process_refund_fixed(amount, tax):
    # Fix: no duplicate
    return {"refund": -amount, "tax": -tax, "tax_summary": 0}


def run_validations():
    results = []

    # DEF-001 test cases
    for total, disc, expected in [(100, 10, 90.0), (200, 20, 160.0), (50, 5, 47.5)]:
        actual = apply_discount_fixed(total, disc)
        results.append({
            "defect_id": "DEF-001",
            "input": f"total={total}, discount={disc}%",
            "expected": expected,
            "actual": actual,
            "passed": actual == expected
        })

    # DEF-002 test cases
    for total, card, expected_points in [(100, 60, 100), (200, 150, 200)]:
        actual = calculate_points_fixed(total)
        results.append({
            "defect_id": "DEF-002",
            "input": f"total={total}, card_portion={card}",
            "expected": expected_points,
            "actual": actual,
            "passed": actual == expected_points
        })

    # DEF-003 test cases
    for amount, tax in [(50, 5), (100, 10)]:
        result = process_refund_fixed(amount, tax)
        passed = result["tax_summary"] == 0
        results.append({
            "defect_id": "DEF-003",
            "input": f"amount={amount}, tax={tax}",
            "expected": "tax_summary=0",
            "actual": f"tax_summary={result['tax_summary']}",
            "passed": passed
        })

    return results


if __name__ == "__main__":
    results = run_validations()
    for r in results:
        status = "✅ PASS" if r["passed"] else "❌ FAIL"
        print(f"{status} | {r['defect_id']} | {r['input']}")
