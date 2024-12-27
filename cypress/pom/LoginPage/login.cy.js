export default class LoginPage {
    static visitlogin() {
        return cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    static logo() {
        return cy.get('[class="orangehrm-login-branding"]');
    }

    static TextLogin() {
        return cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]');
    }

    static InputUsername() {
        return cy.get('[name="username"]');
    }

    static InputPassword() {
        return cy.get('[name="password"]');
    }

    static buttonLogin() {
        return cy.get('[type="submit"]');
    }

    static alertinvalid() {
        return cy.get('[class="oxd-text oxd-text--p oxd-alert-content-text"]');
    }

    static verifyDashboardTitle() {
        return cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]');
    }

    static verifyRequiredMessage(index) {
        return cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').eq(index);
    }

}