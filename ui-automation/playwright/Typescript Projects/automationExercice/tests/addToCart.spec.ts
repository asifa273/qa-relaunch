import { expect, test } from '../src/fixtures/customFixtures';
import testData from '../src/data/testData.json';
import { credentails as credentials } from '../src/data/credentials';
import dotenv from 'dotenv';

test.beforeEach('check if already email exixts delete the user from API', async ({ authPage, request }) => {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    if (!email || !password) {
        throw new Error('Email env viable missing in .env');
    }
    // Plain request: no login needed, the account may not exist yet
    await authPage.deletAccViaAPI(request, email, password);
})

test('add to cart', async ({ authPage }) => {

});
