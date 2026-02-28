import { expect } from '@playwright/test';

export class CartPage {
    constructor(page, tabletNameValue, coffeeMachineNameValue, tabletPriceValue, coffeeMachinePriceValue) {
        this.page = page;
        this.firstItemName = page.locator('[id="cart-item-name-6"]');
        this.firstItemPrice = page.locator('[id="cart-item-price-6"]');
        this.secondItemName = page.locator('[id="cart-item-name-5"]');
        this.secondItemPrice = page.locator('[id="cart-item-price-5"]');

        this.totalValue = page.locator('[id="cart-total"]');
        this.checkoutBtn = page.locator('[id="cart-checkout-button"]');

        this.addFirstItemBtn = page.locator('[id="cart-item-increase-6"]');
        this.removeFirstItemBtn = page.locator('[id="cart-item-decrease-6"]');

        this.tabletNameValue = tabletNameValue;
        this.coffeeMachineNameValue = coffeeMachineNameValue;
        this.tabletPriceValue = tabletPriceValue;
        this.coffeeMachinePriceValue = coffeeMachinePriceValue;
    }

    async compareProductDetails() {
        await expect(this.firstItemName).toHaveText(this.coffeeMachineNameValue);
        await expect(this.firstItemPrice).toHaveText(this.coffeeMachinePriceValue);
        await expect(this.secondItemName).toHaveText(this.tabletNameValue);
        await expect(this.secondItemPrice).toHaveText(this.tabletPriceValue);
    }
    
    async checkTotalPrice() {
        const firstProductPriceNumber = Number((await this.firstItemPrice.innerText()).replace(/\D/g, ''));
        const secondProductPriceNumber = Number((await this.secondItemPrice.innerText()).replace(/\D/g, ''));
        const totalNumber = parseInt((await this.totalValue.innerText()).replace(/[^\d.]/g, ''), 10);
        expect(totalNumber).toBe(firstProductPriceNumber + secondProductPriceNumber);
        await this.checkoutBtn.click();
        await this.page.waitForURL('https://aqa-app.vercel.app/checkout');
    }

}