export default class ForgotPass {

    static buttonForgotPass() {
        return cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]');
    }

    static url() {
        return cy.url();
    }

    static buttonResetPassword() {
        return cy.get('[type="submit"]');
    }

    static resetSuccessfully() {
        return cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]');
    }

    static emptyUsername() {
        return cy.get('span').contains('Required');
    }

    static buttonCancel() {
        return cy.get('[class="oxd-button oxd-button--large oxd-button--ghost orangehrm-forgot-password-button orangehrm-forgot-password-button--cancel"]');
    }
}