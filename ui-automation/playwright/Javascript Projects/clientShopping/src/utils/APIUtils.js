const API_BASE = 'https://rahulshettyacademy.com/api/ecom';

class APIUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post(`${API_BASE}/auth/login`, {
            data: this.loginPayload,
        });
        if (!loginResponse.ok()) {
            throw new Error(`Login failed with status ${loginResponse.status()}: ${await loginResponse.text()}`);
        }
        return (await loginResponse.json()).token;
    }

    async getFirstProductId() {
        const token = await this.getToken();
        const response = await this.apiContext.post(`${API_BASE}/product/get-all-products`, {
            data: {},
            headers: { Authorization: token },
        });
        if (!response.ok()) {
            throw new Error(`Product lookup failed with status ${response.status()}: ${await response.text()}`);
        }
        return (await response.json()).data[0]._id;
    }

    async createOrder(orderPayload) {
        const token = await this.getToken();
        const orderResponse = await this.apiContext.post(`${API_BASE}/order/create-order`, {
            data: orderPayload,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        if (!orderResponse.ok()) {
            throw new Error(`Order creation failed with status ${orderResponse.status()}: ${await orderResponse.text()}`);
        }
        const { orders } = await orderResponse.json();
        return { token, orderId: orders[0] };
    }
}

module.exports = { APIUtils };
