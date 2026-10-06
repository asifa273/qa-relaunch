import type { APIRequestContext, APIResponse } from '@playwright/test';



interface LoginPayload {
    email: string;
    password: string;
}

interface OrderPayload {
    [key: string]: any;
}

interface AuthTokenResponse {
    token: string;
}

interface OrderCreationResponse {
    orders: any[];
}

interface OrderResult {
    token: string;
    orderId: number;
}

export class APIUtils {
    apiContext: APIRequestContext;
    loginPayLoad: LoginPayload;
    constructor(apiContext: APIRequestContext, loginPayLoad: LoginPayload) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken(): Promise<string> {
        const loginResponse: APIResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        });
        if (!loginResponse.ok()) {
            throw new Error(`Login failed with status ${loginResponse.status()}: ${await loginResponse.text()}`);
        }
        const loginResponseJson: AuthTokenResponse = await loginResponse.json();
        return loginResponseJson.token;
    }

    async createOrder(orderPayLoad: OrderPayload): Promise<OrderResult> {
        const response: OrderResult = {
            token: await this.getToken(),
            orderId: 0
        };
        const orderResponse: APIResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });

        if (!orderResponse.ok()) {
            throw new Error(`Order creation failed with status ${orderResponse.status()}: ${await orderResponse.text()}`);
        }
        const orderResponseJson: OrderCreationResponse = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }
}

export default { APIUtils };