/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>
import xpathJson from '/cypress/fixtures/xpath.json';
describe('Edit product', function () {
    beforeEach(function () {
        cy.r1Login();
    });
    it('Edit product', function () {
        cy.xpath(xpathJson.Editproduct.searchfield).click();
        cy.task('getDataFromExcel', 'R1Pos').then((rows) => { // success callback
            if (rows && rows.length > 0) {
                // cy.xpath(xpathJson.Editproduct.searchfield).type(rows[0].Ean);
                cy.xpath(xpathJson.Editproduct.searchfield).clear().type(rows[1].Ean);
                cy.xpath(xpathJson.Editproduct.Multipricecheckrow).then((row) => {
                    //row.length will give you the row count
                    cy.log(row.length);
                    if (row.length > 1) {
                        cy.xpath(xpathJson.Editproduct.bigediticon).click();
                        cy.xpath(xpathJson.Editproduct.multiPriceTab).click();
                        cy.xpath(xpathJson.Editproduct.smallEditIcon).click();
                        cy.xpath(xpathJson.Editproduct.dialogueBox).should('be.visible');
                        cy.xpath(xpathJson.Editproduct.quantityField).clear().type('45');
                        cy.xpath(xpathJson.Editproduct.clickUpdate).click();
                        cy.xpath(xpathJson.Editproduct.bigUpdate).click();
                        cy.xpath(xpathJson.Editproduct.clickOk).click();
                    } else if (row.length === 1) {
                        cy.xpath(xpathJson.Editproduct.Editiconclick).click();
                        cy.xpath(xpathJson.Editproduct.dialogueBox).should('be.visible');
                        cy.xpath(xpathJson.Editproduct.smallQuantity).clear().type('45');
                        cy.xpath(xpathJson.Editproduct.bigUpdate).click();
                        cy.xpath(xpathJson.Editproduct.clickOk).click();
                    }
                });
            }
        })
    })
    // it('Delete product', function () {
    //     cy.xpath(xpathJson.Editproduct.searchfield).click();
    //     cy.task('getDataFromExcel', 'R1Pos').then((rows) => { // success callback
    //         if (rows && rows.length > 0) {
    //             // cy.xpath(xpathJson.Editproduct.searchfield).type(rows[0].Ean);
    //             cy.xpath(xpathJson.Editproduct.searchfield).clear().type(rows[1].Ean);
    //             cy.xpath(xpathJson.Deleteproduct.deleteIcon).click();
    //             cy.xpath(xpathJson.Deleteproduct.yesButton).click();
    //             cy.xpath(xpathJson.Deleteproduct.okButton).click();
    //         }
    //     })
    // })
})