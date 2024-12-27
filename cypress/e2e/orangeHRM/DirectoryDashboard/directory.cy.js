///<reference types="cypress"/>

import LoginPage from "../../../pom/LoginPage/login.cy";
import DirectoryPage from "../../../pom/DirectoryDashboard/directory.cy";
import GetElement from "../../../pom/ElementPage/element.cy";

describe('Dashboard Directory Feature',() =>{
  
    beforeEach(() => {
        LoginPage.visitlogin();
        
        LoginPage.logo().should('be.visible');
        LoginPage.TextLogin().should('have.text','Login');
    });

    it('TC-001: User Access Directory Menu', () => {
        LoginPage.InputUsername().type('Admin');
        LoginPage.InputPassword().type('admin123');

        cy.intercept('GET','**/shortcuts').as("loginsuccess");
        LoginPage.buttonLogin().click();
        cy.wait("@loginsuccess").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200);
        });

        LoginPage.verifyDashboardTitle().should('have.text','Dashboard');

        cy.intercept('GET', '**/directory/employees?limit=14&offset=0').as("employee");

        DirectoryPage.menuDirectory().click();

        cy.wait("@employee").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200);
        });

        DirectoryPage.verifyDirectoryTittle().should('have.text','Directory');
        DirectoryPage.dropdown().click();
        
        //Select by Name
        DirectoryPage.getEmployeeName().type('Peter');
        DirectoryPage.listBox().contains('Peter Mac Anderson').click();

        //Select by Job Tittle
        DirectoryPage.selectBox(0).click();
        DirectoryPage.listBox().contains('Chief Financial Officer').click();
        
        //Select by Location
        DirectoryPage.selectBox(1).click();
        DirectoryPage.listBox().contains('New York Sales Office').click();

        DirectoryPage.buttonSearch().click();

        GetElement.Paragraph().contains('Peter Mac Anderson');
        GetElement.Paragraph().contains('Chief Financial Officer');
        GetElement.Paragraph().contains('New York Sales Office');

        GetElement.Paragraph().contains('Peter Mac Anderson').click();
        
        GetElement.Paragraph().should('contain', 'Peter Mac Anderson');
        GetElement.Paragraph().should('contain', 'Chief Financial Officer');
        GetElement.Paragraph().should('contain', 'New York Sales Office');
        GetElement.Paragraph().should('contain', '112-342-0005');
        GetElement.Paragraph().should('contain', 'peter@osohrm.com');
        
        DirectoryPage.buttonReset().click();
    
        DirectoryPage.getEmployeeName().should('have.value', '');
        DirectoryPage.selectBox(0).should('contain', 'Select');
        DirectoryPage.selectBox(1).should('contain', 'Select');
    });
});