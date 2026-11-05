export interface RegisterUser {
    firstName: string;
    lastName: string;
    address: string;
    cityInput: string;
    stateInput: string;
    zipcode: string;
    phoneNumInput: string;
    SSN: string;

    username: string;
    password: string;
    confirmPassword: string;
}

export function generateRandomUser(): RegisterUser {
    const generatedUser = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    return {

        firstName: 'Hi',
        lastName: 'last',
        address: '123 beach street',
        cityInput: 'city',
        stateInput: 'state',
        zipcode: '12345',
        phoneNumInput: '123-456-7890',
        SSN: '123-45-6789',

        username: generatedUser,
        password: 'Password123!',
        confirmPassword: 'Password123!'

    };
}