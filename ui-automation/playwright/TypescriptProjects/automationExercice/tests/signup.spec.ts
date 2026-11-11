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

test('user lifecycle: register, loggedin, logout, login, delete', async ({ authPage }) => {
    const { email, password } = credentials;
    const details = testData.newuserRegistrationForm;
    const signupName = details.signupName;

    await test.step('Register new user', async () => {
        await authPage.goTo();
        await authPage.newuserSignUp(signupName, email);
    });

    await test.step('Register -enter full registration form for new user -Verify the user is authenticated', async () => {
        // Step - Fill the full registration form & submit
        await authPage.newuserRegistrationForm(password, details);
    });

    await test.step('logout the user', async () => {
        await authPage.logout();
    });

    await test.step('Re-register with same email password -same user', async () => {
        await authPage.goTo();
        await authPage.newuserSignUp(signupName, email);
        await authPage.expectSignUpEmailAlreadyExists();
    });

    await test.step('Log in', async () => {
        await authPage.goTo();
        await authPage.login(email, password);
    });

    await test.step('Delete the user', async () => {
        await authPage.deleteAcc();
    });



});
test('user : register, loggedin', async ({ authPage }) => {
    const { email, password } = credentials;
    const details = testData.newuserRegistrationForm;
    const signupName = details.signupName;

    await test.step('Register new user', async () => {
        await authPage.goTo();
        await authPage.newuserSignUp(signupName, email);
    });

    await test.step('Register -enter full registration form for new user -Verify the user is authenticated', async () => {
        // Step - Fill the full registration form & submit
        await authPage.newuserRegistrationForm(password, details);
    });
});