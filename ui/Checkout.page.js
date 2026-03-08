export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.cardNumberField = page.getByPlaceholder('Card Number (16 digits)');
        this.payNowBtn = page.getByRole('button', {name: 'Pay Now'});
        this.cardDateField = page.getByPlaceholder('MM/YY');
        this.cardCVVField = page.getByPlaceholder('CVV (3 digits)' );

        this.successOrder = page.locator('[id="checkout-success"]');
        this.myAccountBtn = page.locator('[href="/account"]');
    }

    async fillPaymentData(cardNumber, cardDate, cardCVV) {
        await this.cardNumberField.type(cardNumber, {delay: 100});
        await this.cardNumberField.press('Enter');
        await this.cardDateField.fill(cardDate);
        await this.cardCVVField.fill(cardCVV);
        await this.payNowBtn.click();
    }

    async goToMyAccount() {
        await this.myAccountBtn.click();
    }
}