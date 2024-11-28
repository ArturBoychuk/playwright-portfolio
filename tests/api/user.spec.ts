import { test, expect } from '@playwright/test'
import requests from './data/requests.json'

test.describe('User Authoriztiuon Tests', () => {

    test('Successful authorization returns 200 with true in response body', async ({ request }) => {
        const response = await request.post('/Account/v1/Authorized', {
            data: requests.validRequest.data,
        })

        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        expect(responseBody).toBe(true)
    });

    test('Invalid username returns 404', async ({ request }) => {
        const response = await request.post('/Account/v1/Authorized', {
            data: requests.invalidUserRequest.data,
        })

        expect(response.status()).toBe(404);
    })
})

test('Generate Token', async ({ request }) => {
    const response = await request.post('/Account/v1/GenerateToken', {
        data: requests.validRequest.data,
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.status).toBe('Success');
    expect(responseBody.result).toBe('User authorized successfully.');
    expect(responseBody.token).toBeDefined()
    expect(responseBody.token).not.toBe('')
    expect(typeof responseBody.token).toBe('string');
});
