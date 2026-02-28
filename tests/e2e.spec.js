import { test } from '@playwright/test';

import { newUser1 } from '../data/testData';
import { cardData } from '../data/testData';

import { RegisterPage } from '../ui/Register.page';
import { LoginPage } from '../ui/Login.page';
import { CatalogPage } from '../ui/Catalog.page';
import { CartPage } from '../ui/Cart.page';
import { CheckoutPage } from '../ui/Checkout.page';
import { MyAccountPage } from '../ui/MyAccount.page';


test.setTimeout(50 * 1000);
test('test', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);
    const checkoutPage = new CheckoutPage(page);
    const myAccountPage = new MyAccountPage(page);

    await registerPage.navigate();
    await registerPage.fillRegistrationForm(newUser1);
    await loginPage.login(newUser1.email, newUser1.password);
    await catalogPage.selectProduct();

    const cartPage = new CartPage(page, catalogPage.tabletNameValue, catalogPage.coffeeMachineNameValue, catalogPage.tabletPriceValue, catalogPage.coffeeMachinePriceValue);
    await cartPage.compareProductDetails();
    await cartPage.checkTotalPrice();

    await checkoutPage.fillPaymentData(cardData.cardNumber, cardData.cardDate, cardData.cardCVV);
    await checkoutPage.successOrderMessage();

    await checkoutPage.goToMyAccount();
    await myAccountPage.checkFinalOrderDetails(catalogPage.tabletPriceValue, catalogPage.coffeeMachinePriceValue);
    await myAccountPage.checkTwoItems();
    await myAccountPage.logout();
});