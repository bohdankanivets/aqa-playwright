import { expect, test } from '@playwright/test';

import { newUser1 } from '../data/testData';
import { cardData } from '../data/testData';

import { RegisterPage } from '../ui/Register.page';
import { LoginPage } from '../ui/Login.page';
import { CatalogPage } from '../ui/Catalog.page';
import { CartPage } from '../ui/Cart.page';
import { CheckoutPage } from '../ui/Checkout.page';
import { MyAccountPage } from '../ui/MyAccount.page';


test.describe('E2E: order flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            console.log(`Test failed: ${testInfo.title}`);
            await page.screenshot({ 
                path: `test-results/${testInfo.title}-failed.png`, 
                fullPage: true 
            });
        }
    });

    test('Create user, login, order 2 items, payments', async ({ page }) => {
        const catalogPage = new CatalogPage(page);
        const checkoutPage = new CheckoutPage(page);
        const myAccountPage = new MyAccountPage(page);
        const cartPage = new CartPage(page);

        let items;


        await test.step('Select 2 products', async () => {
            items = await catalogPage.getProductDetails();
            await catalogPage.selectProduct();
        });
        await test.step('Verify card counter(visible, quantity)', async () => {
            await expect(catalogPage.cartCount).toBeVisible();
            await expect(catalogPage.cartCount).toContainText('2', { timeout: 3000 });
        });
        await test.step('Go to Cart page', async () => {
            await catalogPage.goToCart();
        });
        await test.step('Verify products details in cart', async () => {
            await expect(cartPage.firstItemName).toHaveText(items.secondProduct.name);
            await expect(cartPage.firstItemPrice).toHaveText(items.secondProduct.price);
            await expect(cartPage.secondItemName).toHaveText(items.firstProduct.name);
            await expect(cartPage.secondItemPrice).toHaveText(items.firstProduct.price);
        });
        await test.step('Verify total price', async () => {
            const firstProductPriceNumber = Number((await cartPage.firstItemPrice.innerText()).replace(/\D/g, ''));
            const secondProductPriceNumber = Number((await cartPage.secondItemPrice.innerText()).replace(/\D/g, ''));
            const totalNumber = parseInt((await cartPage.totalValue.innerText()).replace(/[^\d.]/g, ''), 10);
            expect(totalNumber).toBe(firstProductPriceNumber + secondProductPriceNumber);
        });
        await test.step('Go to Checkout page', async () => {
            await cartPage.goToCheckoutPage();
        });
        await test.step('Fill payment data and submit', async () => {
            await checkoutPage.fillPaymentData(cardData.cardNumber, cardData.cardDate, cardData.cardCVV);
        });
        await test.step('Verify successful order', async () => {
            await expect(checkoutPage.successOrder).toBeVisible({ timeout: 9000 });
            await expect(checkoutPage.page).toHaveURL('/checkout');
        });
        await test.step('Go to My Account page', async () => {
            await checkoutPage.goToMyAccount();
            await expect(myAccountPage.page).toHaveURL('/account');
        });
        await test.step('Verify total amount in My Account page', async () => {
            const firstProductPrice = Number(items.firstProduct.price.replace('$', ''));
            const secondProductPrice = Number(items.secondProduct.price.replace('$', ''));
            await expect(myAccountPage.totalAmountField).toContainText(`${firstProductPrice + secondProductPrice}`);
        });
        await test.step('Verify items list', async () => {
            await expect(myAccountPage.items.first()).toBeVisible();
            await expect(myAccountPage.items.last()).toBeVisible();
            await expect(myAccountPage.logoutBtn).toBeEnabled();
        });
        await test.step('Logout', async () => {
            await myAccountPage.logout();
        });
    });
});