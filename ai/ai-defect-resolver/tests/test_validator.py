from src.validator import (
    apply_discount_fixed,
    calculate_points_fixed,
    process_refund_fixed
)


def test_discount_standard():
    assert apply_discount_fixed(100, 10) == 90.0


def test_discount_large():
    assert apply_discount_fixed(200, 20) == 160.0


def test_discount_small():
    assert apply_discount_fixed(50, 5) == 47.5


def test_loyalty_points_full_total():
    assert calculate_points_fixed(100) == 100


def test_loyalty_points_larger_total():
    assert calculate_points_fixed(200) == 200


def test_refund_no_double_tax():
    result = process_refund_fixed(50, 5)
    assert result["tax_summary"] == 0


def test_refund_tax_line_correct():
    result = process_refund_fixed(100, 10)
    assert result["tax"] == -10
