import {test, expect} from '@playwright/test';
import{ apiDataPost, apiDataPatch } from '../data/testData';

test.describe('API project', () => {
    test('GET placeholder', async ({request}) => {
        const response = await request.get(process.env.API_URL + '/1');
        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log(body);
        expect(body).toEqual({
            userId: 1,
            id: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
        });
    });


    test('POST posts', async ({request}) => {
        const response = await request.post(process.env.API_URL, {data: apiDataPost, headers: {'Content-Type': 'application/json; charset=UTF-8'}});
        expect(response.status()).toBe(201);
        const body = await response.json();
        console.log(body);
    });

    test('PATCH posts', async ({request}) => {
        const response = await request.patch(process.env.API_URL +'/1', {data: apiDataPatch, headers: {'Content-Type': 'application/json; charset=UTF-8'}});
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.title).toBe(apiDataPatch.title);
        console.log(body);
    });
});