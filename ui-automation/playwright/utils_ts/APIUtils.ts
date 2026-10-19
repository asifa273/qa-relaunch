import type { APIRequestContext, APIResponse } from '@playwright/test';



export interface LoginPayload {
    userEmail: string;
    userPassword: string;
}

export interface OrderPayload {
    orders: Array<{
        country: string;
        productOrderedId: string;
    }>;
    [key: string]: unknown;
}

export interface fakePayLoad {
    data: Array<{
        message: string;
    }>;
}

export interface AuthTokenResponse {
    token: string;
    orderId: number;
}

export interface OrderCreationResponse {
    orders: any[];
}

export interface OrderResult {
    token: string;
    orderId: number;
}

export class APIUtils {
    private apiContext: APIRequestContext;
    private loginPayLoad: LoginPayload;

    constructor(apiContext: APIRequestContext, loginPayLoad: LoginPayload) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken(): Promise<string> {
        const loginResponse: APIResponse = await this.apiContext.post(
            'https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginPayLoad,

            });

        if (!loginResponse.ok()) {
            throw new Error(`Login failed with status ${loginResponse.status()}: ${await loginResponse.text()}`);
        }

        const loginResponseJson: AuthTokenResponse = await loginResponse.json();
        return loginResponseJson.token;
    }

    async createOrder(orderPayLoad: OrderPayload): Promise<OrderResult> {
        const token = await this.getToken();
        const orderResponse: APIResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (!orderResponse.ok()) {
            throw new Error(`Order creation failed with status ${orderResponse.status()}: ${await orderResponse.text()}`);
        }
        const orderResponseJson: OrderCreationResponse = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];

        return { token, orderId };
    }
}

export default { APIUtils };