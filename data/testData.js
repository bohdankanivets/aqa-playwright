import { faker } from '@faker-js/faker';

export const newUser1 = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({length: 8}),
    city: faker.location.city(),
    country: 'Ukraine',
    phone: '+380000000000',
    street: faker.location.streetAddress(),
    zipCode: '12345'
}

export const cardData = {
    cardNumber: process.env.CARD_NUMBER,
    cardDate: process.env.CARD_DATE,
    cardCVV: faker.finance.creditCardCVV({length: 3})
}

export const apiDataPost = {
    title: 'Hello World',
    body: 'Test post body',
    userId: 1
}

export const apiDataPatch = {
    title: 'Updated Title'
}