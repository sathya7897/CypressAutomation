/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>
import xpathJson from '/cypress/fixtures/xpath.json';

describe('Create User', function () {
    beforeEach(function () {
        cy.viewport(1280, 800);
        cy.task('getDataFromExcel', 'CreateUser').as('rowsData');

    });

    it('create Biller Admin user', function () {
        cy.r1Login();
        cy.xpath(xpathJson.CreateUser.Adminfieldclick).click();
        cy.xpath(xpathJson.CreateUser.ClickUserssubmenu).click();
        cy.get('@rowsData').then((rows) => { // success callback
            if (rows && rows.length > 0) {
                rows.forEach((user) => {
                    cy.xpath(xpathJson.CreateUser.CreateUserButton).click();
                    cy.xpath(xpathJson.CreateUser.UserNamefield).type(user.userName);
                    cy.xpath(xpathJson.CreateUser.PasswordField).type(user.password);
                    cy.xpath(xpathJson.CreateUser.ConfirmPassword).type(user.password);
                    cy.xpath(xpathJson.CreateUser.FirstNamefield).type(user.firstName);
                    cy.xpath(xpathJson.CreateUser.LastNamefield).type(user.lastName);
                    cy.xpath(xpathJson.CreateUser.Emailfield).type(user.email);
                    cy.xpath(xpathJson.CreateUser.ClickRolefield).click();
                    cy.xpath(xpathJson.CreateUser.SelectMatoption).contains(user.role).click();
                    cy.xpath(xpathJson.CreateUser.MobileNumberfield).type(user.mobile);
                    cy.xpath(xpathJson.CreateUser.ClickSavebutton).click();
                })
            }
            cy.r1Logout();
        });

    });

    it('Login as SuperAdmin', function () {
        cy.get('@rowsData').then((rows) => {
            if (rows && rows.length > 0) {
                let SuperAdminRow = rows.filter(function (e) {
                    return e.role === 'Super Admin';
                });
                if (SuperAdminRow.length > 0) {
                    SuperAdminRow.forEach((role) => {
                        cy.visit(xpathJson.Url);
                        cy.xpath(xpathJson.R1Login.UserName).type(role.userName);
                        cy.xpath(xpathJson.R1Login.Password).type(role.password);
                        cy.xpath(xpathJson.R1Login.OrgName).clear().type(role.orgName);
                        cy.xpath(xpathJson.R1Login.LoginButton).click();
                        cy.xpath(xpathJson.CreateUser.Dashboardmenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Adminfieldclick).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Productsmenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Sendreceivemenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Purchasemenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Retailmenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Reportsmenu).should('be.visible');
                    });
                }
                cy.r1Logout();
            }
        })
    })
    it('Login as StoreAdmin', function () {
        cy.get('@rowsData').then((rows) => {
            if (rows && rows.length > 0) {
                let StoreAdminRow = rows.filter(function (e) {
                    return e.role === 'Store Admin';
                });
                if (StoreAdminRow.length > 0) {
                    StoreAdminRow.forEach((role) => {
                        cy.visit(xpathJson.Url);
                        cy.xpath(xpathJson.R1Login.UserName).type(role.userName);
                        cy.xpath(xpathJson.R1Login.Password).type(role.password);
                        cy.xpath(xpathJson.R1Login.OrgName).clear().type(role.orgName);
                        cy.xpath(xpathJson.R1Login.LoginButton).click();
                        cy.xpath(xpathJson.CreateUser.Dashboardmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Adminfieldclick).click();
                        cy.xpath(xpathJson.CreateUser.ClickUserssubmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Categorysubmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Barcodesubmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Productsmenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Sendreceivemenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Purchasemenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Retailmenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Reportsmenu).should('be.visible');
                    });
                }
                cy.r1Logout();
            }
        })
    })
    it('Login as BillerAdmin', function () {
        cy.get('@rowsData').then((rows) => {
            if (rows && rows.length > 0) {
                let BillerAdminRow = rows.filter(function (e) {
                    return e.role === 'Biller Admin';
                });
                if (BillerAdminRow.length > 0) {
                    BillerAdminRow.forEach((role) => {
                        cy.visit(xpathJson.Url);
                        cy.xpath(xpathJson.R1Login.UserName).type(role.userName);
                        cy.xpath(xpathJson.R1Login.Password).type(role.password);
                        cy.xpath(xpathJson.R1Login.OrgName).clear().type(role.orgName);
                        cy.xpath(xpathJson.R1Login.LoginButton).click();
                        cy.xpath(xpathJson.CreateUser.Dashboardmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Adminfieldclick).click();
                        cy.xpath(xpathJson.CreateUser.ClickUsers).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Categorymenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Barcodemenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Productsmenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Sendreceivemenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Purchasemenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Retailmenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Expensessubmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Reportsmenu).should('not.exist');
                    });
                }
                cy.r1Logout();
            }
        })
    })
    it('Login as SendIndentTeam', function () {
        cy.get('@rowsData').then((rows) => {
            if (rows && rows.length > 0) {
                let SendIndentTeamRow = rows.filter(function (e) {
                    return e.role === 'Send Indent Team';
                });
                if (SendIndentTeamRow.length > 0) {
                    SendIndentTeamRow.forEach((role) => {
                        cy.visit(xpathJson.Url);
                        cy.xpath(xpathJson.R1Login.UserName).type(role.userName);
                        cy.xpath(xpathJson.R1Login.Password).type(role.password);
                        cy.xpath(xpathJson.R1Login.OrgName).clear().type(role.orgName);
                        cy.xpath(xpathJson.R1Login.LoginButton).click();
                        cy.xpath(xpathJson.CreateUser.Dashboardmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Adminfieldclick).click();
                        cy.xpath(xpathJson.CreateUser.ClickUsers).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Categorymenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Inventorymenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Productsmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Sendreceivemenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.clickBackbutton).click();
                        cy.xpath(xpathJson.CreateUser.Purchasemenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Retailmenu).click();
                        cy.xpath(xpathJson.CreateUser.Customermenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Closingbalancemenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Expensessubmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Reportsmenu).should('not.exist');
                    });
                }
                cy.r1Logout();
            }
        })
    })
    it('Login as PurchaseTeam', function () {
        cy.get('@rowsData').then((rows) => {
            if (rows && rows.length > 0) {
                let PurchaseTeamRow = rows.filter(function (e) {
                    return e.role === 'Purchase Team';
                });
                if (PurchaseTeamRow.length > 0) {
                    PurchaseTeamRow.forEach((role) => {
                        cy.visit(xpathJson.Url);
                        cy.xpath(xpathJson.R1Login.UserName).type(role.userName);
                        cy.xpath(xpathJson.R1Login.Password).type(role.password);
                        cy.xpath(xpathJson.R1Login.OrgName).clear().type(role.orgName);
                        cy.xpath(xpathJson.R1Login.LoginButton).click();
                        cy.xpath(xpathJson.CreateUser.Dashboardmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Adminfieldclick).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Productsmenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.productAddButton).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Purchasemenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Sendreceivemenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Retailmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Reportsmenu).should('not.exist');
                    });
                }
                cy.r1Logout();
            }
        })
    })
    it('Login as DC Admin', function () {
        cy.get('@rowsData').then((rows) => {
            if (rows && rows.length > 0) {
                let DCAdminRow = rows.filter(function (e) {
                    return e.role === 'DC Admin';
                });
                if (DCAdminRow.length > 0) {
                    DCAdminRow.forEach((role) => {
                        cy.visit(xpathJson.Url);
                        cy.xpath(xpathJson.R1Login.UserName).type(role.userName);
                        cy.xpath(xpathJson.R1Login.Password).type(role.password);
                        cy.xpath(xpathJson.R1Login.OrgName).clear().type(role.orgName);
                        cy.xpath(xpathJson.R1Login.LoginButton).click();
                        cy.xpath(xpathJson.CreateUser.Dashboardmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Adminfieldclick).click();
                        cy.xpath(xpathJson.CreateUser.ClickUserssubmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Productsmenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.productAddButton).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Purchasemenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Sendreceivemenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Retailmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Reportsmenu).should('not.exist');
                    });
                }
                cy.r1Logout();
            }
        })
    })
    it('Login as Billing user', function () {
        cy.get('@rowsData').then((rows) => {
            if (rows && rows.length > 0) {
                let BillingRow = rows.filter(function (e) {
                    return e.role === 'Billing';
                });
                if (BillingRow.length > 0) {
                    BillingRow.forEach((role) => {
                        cy.visit(xpathJson.Url);
                        cy.xpath(xpathJson.R1Login.UserName).type(role.userName);
                        cy.xpath(xpathJson.R1Login.Password).type(role.password);
                        cy.xpath(xpathJson.R1Login.OrgName).clear().type(role.orgName);
                        cy.xpath(xpathJson.R1Login.LoginButton).click();
                        cy.xpath(xpathJson.CreateUser.Dashboardmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Adminfieldclick).click();
                        cy.xpath(xpathJson.CreateUser.ClickUserssubmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Categorymenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Productsmenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.productAddButton).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Purchasemenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Sendreceivemenu).should('be.visible');
                        cy.xpath(xpathJson.CreateUser.Retailmenu).click();
                        cy.xpath(xpathJson.CreateUser.Expensessubmenu).should('not.exist');
                        cy.xpath(xpathJson.CreateUser.Reportsmenu).should('not.exist');
                    });
                }
                cy.r1Logout();
            }
        })
    })

});