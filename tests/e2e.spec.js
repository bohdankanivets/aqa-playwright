import { expect, test } from '@playwright/test';

import { newUser1 } from '../data/testData';
import { cardData } from '../data/testData';

import { RegisterPage } from '../ui/Register.page';
import { LoginPage } from '../ui/Login.page';
import { CatalogPage } from '../ui/Catalog.page';
import { CartPage } from '../ui/Cart.page';
import { CheckoutPage } from '../ui/Checkout.page';
import { MyAccountPage } from '../ui/MyAccount.page';


test.setTimeout(50 * 1000);
test('Create user, login, order 2 items, payments', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);
    const checkoutPage = new CheckoutPage(page);
    const myAccountPage = new MyAccountPage(page);
    const cartPage = new CartPage(page);

    await registerPage.openLoginPage();
    await registerPage.fillRegistrationForm(newUser1);
    await loginPage.login(newUser1.email, newUser1.password);
    const items = await catalogPage.getProductDetails();
    await catalogPage.selectProduct();

    await expect(catalogPage.cartCount).toBeVisible();
    await expect(catalogPage.cartCount).toContainText('2', { timeout: 3000 });

    await catalogPage.goToCart();

    //Check product details
    await expect(cartPage.firstItemName).toHaveText(items.secondProduct.name);
    await expect(cartPage.firstItemPrice).toHaveText(items.secondProduct.price);
    await expect(cartPage.secondItemName).toHaveText(items.firstProduct.name);
    await expect(cartPage.secondItemPrice).toHaveText(items.firstProduct.price);

    const firstProductPriceNumber = Number((await cartPage.firstItemPrice.innerText()).replace(/\D/g, ''));
    const secondProductPriceNumber = Number((await cartPage.secondItemPrice.innerText()).replace(/\D/g, ''));
    const totalNumber = parseInt((await cartPage.totalValue.innerText()).replace(/[^\d.]/g, ''), 10);
    expect(totalNumber).toBe(firstProductPriceNumber + secondProductPriceNumber);
    
    await cartPage.checkTotalPrice();

    await checkoutPage.fillPaymentData(cardData.cardNumber, cardData.cardDate, cardData.cardCVV);
    await expect(checkoutPage.successOrder).toBeVisible({timeout: 9000});
    await expect(checkoutPage.page).toHaveURL('/checkout');

    await checkoutPage.goToMyAccount();
    await expect(myAccountPage.page).toHaveURL('/account');
    
    const firstProductPrice = Number(items.firstProduct.price.replace('$', ''));
    const secondProductPrice = Number(items.secondProduct.price.replace('$', ''));
    await expect(myAccountPage.totalAmountField).toContainText(`${firstProductPrice + secondProductPrice}`);

    await expect(myAccountPage.items.first()).toBeVisible();
    await expect(myAccountPage.items.last()).toBeVisible();
    await expect(myAccountPage.logoutBtn).toBeEnabled();

    await myAccountPage.logout();
});