# GreenKart Storefront Test Plan

## Application Overview

Functional test plan for https://rahulshettyacademy.com/seleniumPractise/, a GreenKart single-page grocery storefront. Covers the produce catalog, search and quantity controls, cart totals and promo handling, country/terms checkout, order completion, and the Top Deals table. Each test assumes a fresh browser context and empty cart. Exploration confirmed that decrementing quantity at 1 leaves it at 1, an invalid promo shows “Invalid code ..!” without changing totals, and completing checkout returns to the catalog with the cart reset. Known behavior to track: Place Order from an empty cart advances to country selection, and accepting terms without choosing a country returns to the catalog; both should be treated as failing validation cases if checkout is expected to enforce those requirements. The browser also logged repeated favicon ERR_TOO_MANY_REDIRECTS errors during exploration; record separately from functional outcomes.

## Test Scenarios

### 1. Catalog and Product Selection

**Seed:** `tests/seed.spec.ts`

#### 1.1. Catalog loads with product cards and an empty cart

**File:** `tests/green-kart/catalog-load.spec.ts`

**Steps:**
  1. Open https://rahulshettyacademy.com/seleniumPractise/ in a fresh browser context.
    - expect: The GreenKart catalog loads and displays product cards with product names, unit prices, quantity controls, and ADD TO CART buttons.
  2. Inspect the header cart summary before adding anything.
    - expect: The item count and total price are both zero.

#### 1.2. Catalog search filters matching and non-matching products

**File:** `tests/green-kart/catalog-search.spec.ts`

**Steps:**
  1. Open the catalog in a fresh browser context and enter “Apple” in the product search field.
    - expect: Only matching product cards remain visible, including Apple - 1 Kg.
  2. Replace the search text with a string that does not match any product.
    - expect: No unrelated product cards are displayed. Any empty-results state is visible if the application provides one.
  3. Clear the search field.
    - expect: The full product catalog is restored.

#### 1.3. Quantity controls enforce the lower bound

**File:** `tests/green-kart/quantity-controls.spec.ts`

**Steps:**
  1. Open the catalog and search for Apple so only its product card is shown.
    - expect: Apple - 1 Kg is displayed with its default quantity set to 1.
  2. Click the decrement control once while quantity is 1.
    - expect: Quantity remains 1 and does not become zero or negative. This matches the behavior observed during exploration.
  3. Click the increment control twice.
    - expect: Quantity increases to 3.
  4. Click decrement once.
    - expect: Quantity decreases to 2.

### 2. Cart and Checkout

**Seed:** `tests/seed.spec.ts`

#### 2.1. Add multiple product quantities and verify cart arithmetic

**File:** `tests/green-kart/cart-totals.spec.ts`

**Steps:**
  1. Open the catalog in a fresh browser context, search for Apple, set its quantity to 2, and click ADD TO CART.
    - expect: The header shows one distinct cart line and a total of ₹144, based on two units at ₹72 each.
  2. Search for Tomato, set its quantity to 3, and click ADD TO CART.
    - expect: The header reflects two distinct cart lines and the combined total of ₹192.
  3. Open the cart flyout and proceed to checkout.
    - expect: The checkout table shows Apple quantity 2 with line total ₹144 and Tomato quantity 3 with line total ₹48. The total amount is ₹192 and the item count is 2 distinct products.

#### 2.2. Invalid promo code does not alter cart totals

**File:** `tests/green-kart/promo-code.spec.ts`

**Steps:**
  1. Create a fresh cart with two Apples and navigate to checkout; verify the total is ₹144.
    - expect: The cart contains the expected Apple line and the total amount is ₹144 before applying a promo.
  2. Enter “INVALIDCODE” in the promo field and click Apply.
    - expect: The page displays “Invalid code ..!”.
    - expect: The discount remains 0% and the total after discount remains ₹144.

#### 2.3. Empty cart cannot continue to order confirmation

**File:** `tests/green-kart/empty-cart-checkout.spec.ts`

**Steps:**
  1. Open the fresh catalog, open Cart without adding products, and select PROCEED TO CHECKOUT.
    - expect: The cart page displays the empty-cart state and contains no product rows.
  2. Click Place Order while the cart is empty.
    - expect: The application blocks progression and remains on the cart page with an appropriate empty-cart validation message. Current observed behavior navigates to country selection, so this step should fail until empty-cart submission is prevented.

#### 2.4. Terms are required before checkout can proceed

**File:** `tests/green-kart/checkout-terms.spec.ts`

**Steps:**
  1. Add one product, open checkout, click Place Order, and leave the Terms & Conditions checkbox unchecked.
    - expect: The country confirmation page is displayed with the country selector and terms checkbox.
  2. Click Proceed without accepting Terms & Conditions.
    - expect: The page remains on country confirmation and displays “Please accept Terms & Conditions - Required”.

#### 2.5. Country selection is required before checkout can proceed

**File:** `tests/green-kart/checkout-country.spec.ts`

**Steps:**
  1. Add one product, proceed to the country confirmation page, select the Terms & Conditions checkbox, and leave the country set to Select.
    - expect: The country remains unselected and terms are accepted.
  2. Click Proceed.
    - expect: The application requires a country and remains on the confirmation page with a validation message. Current observed behavior returns to the catalog without country validation, so this step should fail if country selection is a requirement.

#### 2.6. Successful checkout clears the completed cart

**File:** `tests/green-kart/checkout-complete.spec.ts`

**Steps:**
  1. Add two Apples, proceed through checkout, select India, accept Terms & Conditions, and click Proceed.
    - expect: Checkout returns to the GreenKart catalog after submission.
  2. Open the cart from the catalog.
    - expect: The completed cart is empty and the header summary is reset to zero items and zero total.

### 3. Top Deals

**Seed:** `tests/seed.spec.ts`

#### 3.1. Search Top Deals table by product name

**File:** `tests/green-kart/offers-search.spec.ts`

**Steps:**
  1. Open the catalog and click Top Deals.
    - expect: The offers page displays a table with product name, price, and discount price columns, plus a Search field.
  2. Enter “Tomato” in the table Search field.
    - expect: Only matching rows remain; the observed Tomato row shows price 37 and discount price 26.
  3. Clear the table Search field.
    - expect: The full set of offer rows is restored.

#### 3.2. Sort, paginate, and change Top Deals page size

**File:** `tests/green-kart/offers-table-controls.spec.ts`

**Steps:**
  1. Open Top Deals in a fresh browser context and note the initial page size and active sort state.
    - expect: The table initially displays five rows per page and exposes page-size options 5, 10, and 20. The initial sort state is announced as name descending.
  2. Click the Veg/fruit name column header.
    - expect: The table announces the changed sort direction and the visible rows follow that order. Clicking again toggles the direction.
  3. Select page size 10.
    - expect: The table displays up to ten rows on the current page and pagination updates to match the new page size.
  4. Click Next, then First.
    - expect: Next changes the active page and visible rows; First returns to page 1. First/Previous are disabled on page 1 and Next/Last are disabled on the final page.

#### 3.3. Delivery date controls accept valid input and clear

**File:** `tests/green-kart/offers-delivery-date.spec.ts`

**Steps:**
  1. Open Top Deals and inspect the Delivery Date controls.
    - expect: Month, day, and year are presented as editable numeric fields.
  2. Enter a valid calendar date using the date fields.
    - expect: The valid date remains displayed in the date controls.
  3. Enter an invalid month, day, or year value and move focus away.
    - expect: Invalid date values are rejected, normalized, or surfaced with validation; they must not silently be treated as a valid date.
  4. Use the adjacent date control that clears the current date.
    - expect: All date fields clear. This clear behavior was observed during exploration.
