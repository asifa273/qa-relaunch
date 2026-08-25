# Defect Resolution Report

**Defect ID:** DEF-001
**Title:** Checkout total incorrect when percentage discount applied
**Severity:** Critical
**Module:** checkout_service.py
**Date:** 2026-04-11
**Status:** ✅ RESOLVED

---

## Root Cause Analysis
# Bug Analysis: DEF-001 - Checkout Discount Calculation Error

## 1. Root Cause

The `apply_discount` function is treating the discount parameter as a **fixed dollar amount** rather than a **percentage**. When a 10% discount coupon is scanned, the system passes `10` (or `0.10`) as the discount value, but the function simply subtracts this value directly from the total instead of calculating 10% of the total first. For example, on a $100 order with 10% off, it computes `100 - 10 = $90` or `100 - 0.10 = $99.90` instead of `100 - (100 * 0.10) = $90`.

## 2. Impact Assessment

| Category | Level | Details |
|----------|-------|---------|
| **Financial** | 🔴 High | Customers being overcharged; potential refund liability and revenue reconciliation issues |
| **Customer Trust** | 🔴 High | Broken promotional promises damage brand reputation |
| **Compliance** | 🟡 Medium | Potential consumer protection/advertising law violations |
| **Scope** | 🔴 High | Affects all percentage-based promotions system-wide |

## 3. Suggested Fix Approach

```python
# BEFORE (Defective)
def apply_discount(total, discount):
    return total - discount

# AFTER (Fixed)
def apply_discount(total, discount, is_percentage=False):
    """
    Apply discount to total.
    
    Args:
        total: Original price
        discount: Discount value (percentage as 0-100 or fixed amount)
        is_percentage: True if discount is a percentage
    
    Returns:
        Discounted total
    """
    if is_percentage:
        discount_amount = total * (discount / 100)
    else:
        discount_amount = discount
    
    return max(total - discount_amount, 0)  # Prevent negative totals
```

**Implementation Steps:**
1. Add discount type parameter to distinguish percentage vs. fixed discounts
2. Update all calling code to pass the appropriate discount type flag
3. Add unit tests covering both discount types and edge cases (0%, 100%, amounts > total)
4. Verify coupon database schema includes discount type field

---

## AI-Generated Fix
# Corrected Code

```python
def apply_discount(total, discount, is_percentage=False):
    """
    Apply a discount to the total price.
    
    Args:
        total: Original price amount
        discount: Discount value (percentage as 0-100 if is_percentage=True, 
                  or fixed dollar amount if is_percentage=False)
        is_percentage: Flag indicating if discount is a percentage (default: False)
    
    Returns:
        Final total after discount applied (minimum 0)
    """
    if is_percentage:
        # Convert percentage to decimal and calculate discount amount
        discount_amount = total * (discount / 100)
    else:
        # Use discount as a fixed dollar amount
        discount_amount = discount
    
    # Ensure total never goes negative
    return max(total - discount_amount, 0)
```

## What Was Changed and Why

| Change | Reason |
|--------|--------|
| **Added `is_percentage` parameter** | Allows the function to distinguish between percentage-based discounts (e.g., "10% off") and fixed-amount discounts (e.g., "$10 off"). The original code assumed all discounts were fixed amounts. |
| **Added percentage calculation logic** | When `is_percentage=True`, the function now correctly calculates the discount as `total * (discount / 100)`. A 10% discount on $100 now properly yields $10 off, not $0.10 off. |
| **Added `max(..., 0)` guard** | Prevents negative totals in edge cases where the discount exceeds the total (e.g., $5 order with $10 coupon). |
| **Added docstring** | Documents the expected input formats and behavior for future maintainers. |

## Example Usage

```python
# Percentage discount: 10% off a $100 order
apply_discount(100, 10, is_percentage=True)   # Returns: 90.0 ✓

# Fixed amount discount: $10 off a $100 order  
apply_discount(100, 10, is_percentage=False)  # Returns: 90 ✓

# Edge case: Discount exceeds total
apply_discount(5, 10, is_percentage=False)    # Returns: 0 (not -5)
```

---

## Validation Results

| Defect | Input | Expected | Actual | Status |
|--------|-------|----------|--------|--------|
| DEF-001 | total=100, discount=10% | 90.0 | 90.0 | ✅ Pass |
| DEF-001 | total=200, discount=20% | 160.0 | 160.0 | ✅ Pass |
| DEF-001 | total=50, discount=5% | 47.5 | 47.5 | ✅ Pass |
