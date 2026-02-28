export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.registerBtn = page.locator('[id="login-register-button"]');
        this.firstNameField = page.locator('[id="register-first-name"]');
        this.lastNameField = page.locator('[id="register-last-name"]');
        this.emailField = page.locator('[id="register-email"]');
        this.passwordField = page.locator('[id="register-password"]');
        this.cityField = page.locator('[id="register-city"]');
        this.countryDropdown = page.locator('[id="register-country"]');
        this.phoneField = page.locator('[id="register-phone"]');
        this.streetField = page.locator('[id="register-street"]');
        this.zipCodeField = page.locator('[id="register-zip"]');
        this.submitRegisterBtn = page.locator('[id="register-button"]');
    }

    async navigate() {
        await this.page.goto('https://aqa-app.vercel.app/login');
    }

    async fillRegistrationForm(testData) {
        await this.registerBtn.click();
        await this.firstNameField.waitFor();
        await this.firstNameField.fill(testData.firstName);
        await this.lastNameField.waitFor();
        await this.lastNameField.fill(testData.lastName);
        await this.emailField.waitFor();
        await this.emailField.fill(testData.email);
        await this.passwordField.fill(testData.password);
        await this.cityField.fill(testData.city);
        await this.countryDropdown.selectOption(testData.country);
        await this.phoneField.fill(testData.phone);
        await this.streetField.fill(testData.street);
        await this.zipCodeField.fill(testData.zipCode);
        await this.submitRegisterBtn.click();
    }
}