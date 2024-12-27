///<reference types="cypress"/>
import LoginPage from "../../../pom/LoginPage/login.cy";


describe('Login Feature',() =>{

    beforeEach(() => {
        LoginPage.visitlogin();

        LoginPage.logo().should('be.visible');
        LoginPage.TextLogin().should('have.text','Login');
    });

    it('TC-001: Login with Valid Credentials',() =>{
        LoginPage.InputUsername().type('Admin');
        LoginPage.InputPassword().type('admin123');
        
        cy.intercept("GET", '**/employees/action-summary').as("actionsummary");
        LoginPage.buttonLogin().click();
        cy.wait("@actionsummary").then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

        LoginPage.verifyDashboardTitle().should('have.text','Dashboard');
    });

    it('TC-002: Login with Invalid Username',() =>{
        LoginPage.InputUsername().type('InvalidUser');
        LoginPage.InputPassword().type('admin123');
        
        cy.intercept("GET", "**/i18n/messages").as("message");
        LoginPage.buttonLogin().click();
        cy.wait("@message").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(304);
        });
        
        LoginPage.alertinvalid().should('have.text','Invalid credentials');
    });

    it('TC-003: Login with Invalid Password',() =>{
        LoginPage.InputUsername().type('Admin');
        LoginPage.InputPassword().type('InvalidPassword');

        cy.intercept("GET", "**/i18n/messages").as("message");
        LoginPage.buttonLogin().click();
        cy.wait("@message").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(304);
        });
        
        LoginPage.alertinvalid().should('have.text','Invalid credentials');
    });

    it('TC-004: Login with Blank Username and Password', () => {
        LoginPage.InputUsername().clear();
        LoginPage.InputPassword().clear();
        LoginPage.buttonLogin().click();
    
        LoginPage.verifyRequiredMessage(0).should('be.visible').and('contain.text', 'Required');
    });

    it('TC-005: Login with Empty Username', () => {
        LoginPage.InputUsername().clear();
        LoginPage.InputPassword().type('admin123');
        LoginPage.buttonLogin().click();
    
        LoginPage.verifyRequiredMessage(0).should('be.visible').and('contain.text', 'Required');
    });

    it('TC-006: Login with Empty Password', () => {
        LoginPage.InputUsername().type('Admin');
        LoginPage.InputPassword().clear();
        LoginPage.buttonLogin().click();
        
        LoginPage.verifyRequiredMessage(0).should('have.text','Required');
    });

    it('TC-007: Login with Special Characters', () => {
        LoginPage.InputUsername().type('InvalidUser');
        LoginPage.InputPassword().type('InvalidPassword');

        cy.intercept("POST", "**/auth/validate").as("validate");
        LoginPage.buttonLogin().click();
        cy.wait("@validate").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(302);
        });
    
        LoginPage.alertinvalid().should('have.text','Invalid credentials');
    });
});
