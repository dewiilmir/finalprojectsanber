export default class DirectoryPage {
    static visitDirectory() {
        return cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    }

    static dropdown() {
        return  cy.get('[class="oxd-icon bi-caret-down-fill"]');
    }

    static menuDirectory() {
        return cy.get('[class="oxd-text oxd-text--span oxd-main-menu-item--name"]').contains('Directory');
    }
    static verifyDirectoryTittle() {
        return cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]');
    }

    static getEmployeeName() {
        return cy.get('.oxd-autocomplete-text-input [placeholder="Type for hints..."]'); 
    }

    static listBox() {
        return  cy.get('[role="listbox"]');
    }
    
    static selectBox(index) {
        return cy.get('.oxd-select-text-input').eq(index);
    }

    static buttonSearch() {
        return cy.get('[type="submit"]')
    }

    static buttonReset() {
        return cy.get('[type="reset"]')
    }
}