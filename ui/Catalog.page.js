import { expect } from "@playwright/test";

export class CatalogPage {
    constructor(page) {
        this.page = page;
        this.tabletProduct = page.locator('[id="product-add-5"]');
        this.coffeeMachineProduct = page.locator('[id="product-add-6"]');
        this.cartCount = page.locator('[id="cart-count"]');
        
        this.tabletName = page.locator('[id="product-name-5"]');
        this.coffeeMachineName = page.locator('[id="product-name-6"]');
        this.tabletPrice = page.locator('[id="product-price-5"]');
        this.coffeeMachinePrice = page.locator('[id="product-price-6"]');

        this.tabletNameValue = '';
        this.coffeeMachineNameValue = '';

        this.tabletPriceValue = '';
        this.coffeeMachinePriceValue = '';
    }

    async selectProduct() {
        await this.coffeeMachineProduct.click({delay: 2000});
        await this.tabletProduct.click({delay: 2000});
        await this.page.waitForLoadState('networkidle');
        await this.cartCount.waitFor();
        await expect(this.cartCount).toContainText('2', { timeout: 3000 });
        await this.saveProductDetails();
        await this.cartCount.click();
    }

    async saveProductDetails() {
        this.tabletNameValue = await this.tabletName.innerText();
        this.coffeeMachineNameValue = await this.coffeeMachineName.innerText();
        this.tabletPriceValue = await this.tabletPrice.innerText();
        this.coffeeMachinePriceValue = await this.coffeeMachinePrice.innerText();
    }
}