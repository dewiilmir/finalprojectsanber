export default class APIPage{
    static APIdirectory(){
        return cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0');
    }
    static APIactionsummary(){
        return cy.intercept("GET", '**/employees/action-summary');
    }
    static APIlocation(){
        return cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&locationId=2&empNumber=3&jobTitleId=2');
    }
    static APImessages(){
        return cy.intercept('GET", "**/i18n/messages');
    }
    static APIemployee(){
        return cy.intercept('GET', '**/employees?limit=14&offset=0');
    }
}