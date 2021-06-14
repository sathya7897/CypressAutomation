// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import xpathJson from '/cypress/fixtures/xpath.json';
Cypress.Commands.add('r1Login', () => {
    cy.visit(xpathJson.url);
    cy.viewport(1280, 800);
    cy.task('getDataFromExcel', 'R1Login').then((rows) => {
        rows.forEach((Login) => {
            cy.xpath(xpathJson.R1Login.UserName).type(Login.UserName);
            cy.xpath(xpathJson.R1Login.Password).type(Login.Password);
            cy.xpath(xpathJson.R1Login.OrgName).type(Login.OrgName);
        })
        cy.xpath(xpathJson.R1Login.LoginButton).click();
    })
})

Cypress.Commands.add('r1Logout', () => {
    cy.xpath(xpathJson.R1Logout.ClickLogoutMenu).click();
    cy.xpath(xpathJson.R1Logout.ClickLogout).contains('Logout').click();
})