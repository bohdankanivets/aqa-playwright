export class MyAccountPage {
    constructor(page) {
        this.page = page;

        this.items = page.locator('#account-order-0 ul > li');
        this.totalAmountField = page.locator('#account-order-0', {hasText: 'Total Amount:'});
        this.logoutBtn = page.locator('[id="account-logout-button"]');
    }

    async logout() {
        await this.logoutBtn.click();
    }   
}
