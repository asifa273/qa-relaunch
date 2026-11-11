//The script defines an APIUtils helper class designed to interact with 
// the Rahul Shetty Academy E-commerce test API using an HTTP client (typically Playwright's APIRequestContext):


const API_BASE = 'https://rahulshettyacademy.com/api/ecom';

class APIUtils {
    //Stores the request context and user login credentials (email and password object) as instance properties.
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        /* Sends a POST request to the login endpoint with the provided login payload.
           Verifies the HTTP status code using ok().
           Parses the JSON response body and returns the session token.
        */
        const loginResponse = await this.apiContext.post(`${API_BASE}/auth/login`, {
            data: this.loginPayload,
        });
        if (!loginResponse.ok()) {
            throw new Error(`Login failed with status ${loginResponse.status()}: ${await loginResponse.text()}`);
        }
        return (await loginResponse.json()).token;
    }

    async getFirstProductId() {
        /* Calls getToken() to get a valid authentication token.
            Sends a POST request to /product/get-all-products with the Authorization header set.
            Extracts and returns the MongoDB ID (_id) of the first product in the catalog array. 
        */
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
        /* Authenticates to retrieve a valid token.
            Sends a POST request to /order/create-order containing the purchase payload and authorization headers.
            Parses the response and returns an object containing the current session token and the generated orderId (orders[0]).
        */
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
