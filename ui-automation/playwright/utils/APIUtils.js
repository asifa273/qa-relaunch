class APIUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        });
        if (!loginResponse.ok()) {
            throw new Error(`Login failed with status ${loginResponse.status()}: ${await loginResponse.text()}`);
        }
        const loginResponseJson = await loginResponse.json();
        return loginResponseJson.token;
    }

    async createOrder(orderPayLoad) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });

        if (!orderResponse.ok()) {
            throw new Error(`Order creation failed with status ${orderResponse.status()}: ${await orderResponse.text()}`);
        }
        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }
}

module.exports = { APIUtils };