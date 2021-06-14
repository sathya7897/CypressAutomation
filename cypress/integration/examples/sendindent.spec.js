/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>
import xpathJson from '/cypress/fixtures/xpath.json';

describe('Send Indent', function () {

    it('Sendindent', function () {
        cy.r1Login();
        cy.viewport(1280, 800);
        cy.xpath(xpathJson.Sendindent.sendIndentMenu).click();

        cy.task('getDataFromExcel', 'sendindent').then((rows) => {
            if (rows && rows.length > 0) {
                rows.forEach((store) => {
                    cy.xpath(xpathJson.Sendindent.storeSelector).contains(store.StoreName).click();
                    cy.wait(5000);
                    cy.xpath(xpathJson.Sendindent.checkBox).click().click();
                    cy.xpath(xpathJson.Sendindent.)
                })
            }

        });
    })
});