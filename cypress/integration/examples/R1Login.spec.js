/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>
import xpathJson from '/cypress/fixtures/xpath.json';
describe('R1 Login-suite', function () {
    beforeEach(function () {
        cy.visit(xpathJson.Url);
    });
    it('R1Login', function () {
        cy.task('getDataFromExcel', 'R1Login').then((rows) => { // success callback
            if (rows && rows.length > 0) {
                rows.forEach((Login) => {
                    cy.xpath(xpathJson.R1Login.UserName).type(Login.UserName);
                    cy.xpath(xpathJson.R1Login.Password).type(Login.Password);
                    cy.xpath(xpathJson.R1Login.OrgName).clear().type(Login.OrgName);
                })
                cy.xpath(xpathJson.R1Login.LoginButton).click();
            }
        })
    })

    it('Fail login when no credentials', function () {
        cy.xpath(xpathJson.R1Login.OrgName).clear();
        cy.xpath(xpathJson.R1Login.LoginButton).click();
        cy.xpath(xpathJson.R1Login.EmptyUserName).should('have.length', 1);
        cy.xpath(xpathJson.R1Login.EmptyPassword).should('have.length', 1);
        cy.xpath(xpathJson.R1Login.EmptyOrgName).should('have.length', 1);
    })

    it('Go to products page without login', function () {
        cy.visit(xpathJson.ProductsUrl).should('not.exist');
    })

})