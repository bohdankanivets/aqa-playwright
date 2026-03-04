export class CartPage {
    constructor(page) {
        this.page = page;
        this.firstItemName = page.locator('[id="cart-item-name-6"]');
        this.firstItemPrice = page.locator('[id="cart-item-price-6"]');
        this.secondItemName = page.locator('[id="cart-item-name-5"]');
        this.secondItemPrice = page.locator('[id="cart-item-price-5"]');

        this.totalValue = page.locator('[id="cart-total"]');
        this.checkoutBtn = page.locator('[id="cart-checkout-button"]');

        this.addFirstItemBtn = page.locator('[id="cart-item-increase-6"]');
        this.removeFirstItemBtn = page.locator('[id="cart-item-decrease-6"]');
    }
    
    async checkTotalPrice() {
        await this.checkoutBtn.click();
        await this.page.waitForURL('/checkout');
    }

}