import { expect } from '@playwright/test';

export class MyAccountPage {
    constructor(page) {
        this.page = page;

        this.items = page.locator('#account-order-0 ul > li');
        this.totalAmountField = page.locator('#account-order-0', {hasText: 'Total Amount:'});
        this.logoutBtn = page.locator('[id="account-logout-button"]');
    }

    async checkFinalOrderDetails(firstProductPrice, secondProductPrice) {
        const totalPrice = Number(firstProductPrice.replace('$', '')) + Number(secondProductPrice.replace('$', ''));
        await expect(this.totalAmountField).toContainText(`${totalPrice}`);
    }

    async checkTwoItems() {
        await expect(this.items.first()).toBeVisible();
        await expect(this.items.last()).toBeVisible();
        await expect(this.logoutBtn).toBeEnabled();
    }

    async logout() {
        await this.logoutBtn.click();
    }   
}
