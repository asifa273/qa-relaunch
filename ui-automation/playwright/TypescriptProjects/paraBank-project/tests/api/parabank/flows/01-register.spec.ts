import { test, expect, request as pwRequest, type APIRequestContext } from '@playwright/test';
import { WEB_BASE, API_BASE } from '../../../../config/config';
import { generateRandomUser } from '../../../../test-data/user.factory';


// Returns the text inside the error <span> with the given id, or undefined if it is not on the page.
// Example HTML: <span id="customer.username.errors" class="error">This username already exists.</span>
function getErrorText(html: string, spanId: string): string | undefined {
    const start = html.indexOf(`id="${spanId}"`);   // 1. find the span
    if (start === -1) return undefined;              //    not on the page -> no error

    const textStart = html.indexOf('>', start) + 1;  // 2. text begins after the tag's closing '>'
    const textEnd = html.indexOf('</span>', textStart); // 3. text ends at '</span>'

    return html.slice(textStart, textEnd).trim();    // 4. cut out the text
}

test.describe('ParaBank - Register through API', () => {
    // Registering needs no logged-in session, so start with empty storage
    test.use({ storageState: { cookies: [], origins: [] } });

    let api: APIRequestContext;

    test.beforeAll(async () => {
        api = await pwRequest.newContext({ extraHTTPHeaders: { Accept: 'application/json' } });
    });

    test.afterAll(async () => { await api.dispose(); });

    test('Register a new user', async () => {
        const user = generateRandomUser();

        // 1.a Open the register page first so the server gives us a session cookie
        const registerPage = await api.get(`${WEB_BASE}/register.htm`);
        expect(registerPage.ok(), 'register page should load').toBeTruthy();

        // 1.b Submit the registration form (field names must match ParaBank's form)
        const registrationForm = await api.post(`${WEB_BASE}/register.htm`, {
            form: {
                'customer.firstName': user.firstName,
                'customer.lastName': user.lastName,
                'customer.address.street': user.address,
                'customer.address.city': user.city,
                'customer.address.state': user.state,
                'customer.address.zipCode': user.zipcode,
                'customer.phoneNumber': user.phoneNumber,
                'customer.ssn': user.ssn,
                'customer.username': user.username,
                'customer.password': user.password,
                'repeatedPassword': user.confirmPassword
            },
        });
        const registrationFormMesg = await registrationForm.text();
        expect(registrationFormMesg).not.toContain('This username already exists');
        expect(registrationForm.ok(), 'login should be successful').toBeTruthy();
        console.log(`Registered username thru raw HTTP(no browser)= ${user.username}`);


        //2.a Verify the user was created by logging in through API
        const login = await api.get(`${API_BASE}/login/${user.username}/${user.password}`);
        expect(login.ok(), 'login should be successful').toBeTruthy();

        // ParaBank's login response is the customer record; it has no username field.
        // A successful login already proves the username/password were saved.
        const customer = await login.json();
        expect(customer).toMatchObject({
            id: expect.any(Number),
            firstName: user.firstName,
            lastName: user.lastName,
            ssn: user.ssn,
        });
        console.log(`Registered username created thru API= ${user.username}`);
    });

    //3. Negative test - Try using same username twice, then assert second attamept does not create working LOGIN
    test('Register with same username whould fail', async () => {
        const user = generateRandomUser();

        const form = {
            'customer.firstName': user.firstName,
            'customer.lastName': user.lastName,
            'customer.address.street': user.address,
            'customer.address.city': user.city,
            'customer.address.state': user.state,
            'customer.address.zipCode': user.zipcode,
            'customer.phoneNumber': user.phoneNumber,
            'customer.ssn': user.ssn,
            'customer.username': user.username,
            'customer.password': user.password,
            'repeatedPassword': user.confirmPassword
        };

        // Use a fresh context so we are not logged in from an earlier registration
        const register = async () => {
            const ctx = await pwRequest.newContext();
            await ctx.get(`${WEB_BASE}/register.htm`);
            const res = await ctx.post(`${WEB_BASE}/register.htm`, { form });
            const body = await res.text();
            await ctx.dispose();
            return { res, body };
        };

        // First registration should succeed
        const first = await register();
        expect(first.res.ok(), 'first registration should be accepted').toBeTruthy();
        expect(first.body).not.toContain('This username already exists');

        // Second registration with the same username should be rejected.
        // ParaBank still returns 200, so check the error message on the page.
        const second = await register();
        expect(second.res.status()).toBe(200);

        // Pull the username error text out of the returned HTML (same text the UI shows under the Username field)
        const usernameError = getErrorText(second.body, 'customer.username.errors');
        console.log(`Username: ${user.username}`);
        console.log(`Error shown on page: "${usernameError}"`);

        expect(usernameError, 'duplicate username should be rejected').toBe('This username already exists.');
    });

});

