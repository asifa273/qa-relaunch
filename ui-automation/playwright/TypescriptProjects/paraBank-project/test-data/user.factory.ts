export interface RegisterUser {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    ssn: string;

    username: string;
    password: string;
    confirmPassword: string;
}

export function generateRandomUser(): RegisterUser {
    // ParaBank rejects long usernames (shows "already exists"), so keep it to 16 chars
    const generatedUser = `user_${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 1000)}`;
    return {

        firstName: 'Hi',
        lastName: 'last',
        address: '123 beach street',
        city: 'city',
        state: 'state',
        zipcode: '12345',
        phoneNumber: '123-456-7890',
        ssn: '123-45-6789',

        username: generatedUser,
        password: 'Password123!',
        confirmPassword: 'Password123!'

    };
}