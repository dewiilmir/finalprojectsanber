///<reference types="cypress"/>

import LoginPage from "../../../pom/LoginPage/login.cy";
import ForgotPass from "../../../pom/ForgotPass/forgotpass.cy";
import GetElement from "../../../pom/ElementPage/element.cy";


describe('Forgot Password Feature',() =>{
 
    beforeEach(() => {
        LoginPage.visitlogin();
        
        LoginPage.logo().should('be.visible');
        LoginPage.TextLogin().should('have.text','Login');
    });

    it('TC-01: Login with Forgot Password', () => {
        cy.intercept("GET","**/auth/requestPasswordResetCode").as("forgotpass");
        ForgotPass.buttonForgotPass().click();
        cy.wait("@forgotpass").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200);
        });

        ForgotPass.url().should('include', '/auth/requestPasswordResetCode'); 
        GetElement.h6().should('contain.text', 'Reset Password');
    });

    it('TC-02: Reset Password with Valid Username', () => {
        cy.intercept("GET","**/auth/requestPasswordResetCode").as("forgotpass");
        ForgotPass.buttonForgotPass().click();
        cy.wait("@forgotpass").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200);
        });

        ForgotPass.url().should('include', '/auth/requestPasswordResetCode'); 
        GetElement.h6().should('contain.text', 'Reset Password');

        LoginPage.InputUsername().type('Admin');

        cy.intercept("POST","**/auth/requestResetPassword").as("requestResetPass");
        ForgotPass.buttonResetPassword().click();
        cy.wait("@requestResetPass").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(302);
        });
        
        ForgotPass.resetSuccessfully().should('be.visible');    
    });

    it('TC-03: Reset Password with Empty Username', () => {
        cy.intercept("GET","**/auth/requestPasswordResetCode").as("forgotpass");
        ForgotPass.buttonForgotPass().click();
        cy.wait("@forgotpass").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200);
        });

        ForgotPass.url().should('include', '/auth/requestPasswordResetCode'); 
        GetElement.h6().should('contain.text', 'Reset Password');

        LoginPage.InputUsername().clear();
        ForgotPass.buttonResetPassword().click();
        
        ForgotPass.emptyUsername().should('have.text', 'Required');    
    });

    it('TC-04: Cancel Forgot Password', () => {
        cy.intercept("GET","**/auth/requestPasswordResetCode").as("forgotpass");
        ForgotPass.buttonForgotPass().click();
        cy.wait("@forgotpass").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200);
        });

        ForgotPass.url().should('include', '/auth/requestPasswordResetCode'); 
        GetElement.h6().should('contain.text', 'Reset Password');

        cy.intercept("GET", "**/i18n/messages").as("cancelforgotpass");
        ForgotPass.buttonCancel().click()
        cy.wait("@cancelforgotpass").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(304);
        });

        LoginPage.TextLogin().should('have.text','Login');
    });

});