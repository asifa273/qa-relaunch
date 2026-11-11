import type { Page, Request } from '@playwright/test';

export const CREATE_ORDER_URL = '**/api/ecom/order/create-order';

export interface CreateOrderBody {
    orders: Array<{ country: string; productOrderedId: string }>;
}

/** Answers create-order with a fake success, so no real order is placed. */
export async function mockCreateOrderSuccess(page: Page, orderId = 'MOCK-ORDER-0001'): Promise<void> {
    await page.route(CREATE_ORDER_URL, (route) =>
        route.fulfill({
            status: 201,
            contentType: 'application/json',
            body: JSON.stringify({
                orders: [orderId],
                productOrderId: ['mock-product'],
                message: 'Order Placed Successfully',
            }),
        })
    );
}

/** Answers create-order with an error, e.g. a declined payment or a gateway outage. */
export async function mockCreateOrderFailure(
    page: Page,
    status = 500,
    message = 'Payment gateway unavailable'
): Promise<void> {
    await page.route(CREATE_ORDER_URL, (route) =>
        route.fulfill({
            status,
            contentType: 'application/json',
            body: JSON.stringify({ message }),
        })
    );
}

/** Drops the create-order request as if the network failed. */
export async function abortCreateOrder(page: Page): Promise<void> {
    await page.route(CREATE_ORDER_URL, (route) => route.abort('internetdisconnected'));
}

/** Holds matching requests for `ms` before letting them through, to test slow gateways. */
export async function delayRoute(page: Page, urlPattern: string, ms: number): Promise<void> {
    await page.route(urlPattern, async (route) => {
        await new Promise((resolve) => setTimeout(resolve, ms));
        await route.fallback();
    });
}

/** Resolves with the next create-order request so the test can check what the UI sent. */
export function waitForCreateOrderRequest(page: Page): Promise<Request> {
    return page.waitForRequest((req) => req.url().includes('/order/create-order') && req.method() === 'POST');
}

export function readCreateOrderBody(request: Request): CreateOrderBody {
    return request.postDataJSON() as CreateOrderBody;
}
