/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>
import xpathJson from '/cypress/fixtures/xpath.json';

describe('R1 Pos', function () {

    it('R1Pos', function () {
        cy.r1Login();
        cy.viewport(1280, 800);
        cy.xpath(xpathJson.Pospage.clickRetailMenu).click();
        cy.xpath(xpathJson.Pospage.clickRetailPos).click();
        cy.wait(3000);
        cy.get('body').then((body) => {
            if (body.find(xpathJson.Pospage.productExist).length > 1) {
                cy.xpath(xpathJson.Pospage.clickCancel).click();
                cy.xpath(xpathJson.Pospage.clickOk).click();
            }
        });
        cy.wait(3000);
        cy.task('getDataFromExcel', 'R1Pos').then((rows) => { // success callback

            if (rows && rows.length > 0) {
                rows.forEach((product, index) => {
                    cy.xpath(xpathJson.Pospage.EnterProductName.replace('{{index}}', index)).type(product.Ean).type('{enter}');
                    cy.wait(1000);

                    cy.get('body').then((body) => {
                        if (body.find(xpathJson.Pospage.SelectEanRowCSS).length) {
                            cy.get(xpathJson.Pospage.SelectEanRowCSS).type('{enter}');
                        }
                    });
                })
            }
        })
    });
    it('POS calculation', function () {
        cy.wait(500);
        let calculatedAmount = 0;
        cy.task('getDataFromExcel', 'R1Pos').then((rows) => {
            cy.wrap(rows).each((value, index) => {
                cy.xpath(xpathJson.Pospage.ProductPrice.replace('{{index}}', index)).invoke('val').then(ProductPrice => {
                    cy.xpath(xpathJson.Pospage.ProductQuantity.replace('{{index}}', index)).invoke('val').then(ProductQuantity => {
                        cy.xpath(xpathJson.Pospage.ProductTotalAmount.replace('{{index}}', index)).invoke('val').then(ProductTotalAmount => {
                            expect(parseFloat(ProductPrice) * parseFloat(ProductQuantity)).to.eq(parseFloat(ProductTotalAmount));
                            calculatedAmount = calculatedAmount + (ProductPrice * ProductQuantity);
                        })
                    })
                })
            });
            cy.xpath(xpathJson.Pospage.GrandTotal).invoke('text').then(GrandTotal => {
                expect(parseFloat(GrandTotal)).to.eq(parseFloat(calculatedAmount));
            })
        });
    })
    it('checkout', function () {
        const EnterAmountField = 1000;
        cy.xpath(xpathJson.Pospage.CheckoutButton).click();
        cy.wait(5000);
        cy.get('body').then((body) => {
            if (body.find(xpathJson.Pospage.checkoutGrandTotalCss).length > 0) {
                cy.xpath(xpathJson.Pospage.CheckoutGrandTotal).invoke('text').then(CheckoutGrandTotal => {
                    cy.xpath(xpathJson.Pospage.EnterAmountField).type(EnterAmountField).type('{enter}');
                    cy.xpath(xpathJson.Pospage.BalanceAmount).invoke('text').then(BalanceAmount => {
                        cy.xpath(xpathJson.Pospage.AmountDue).invoke('text').then(AmountDue => {
                            cy.log(CheckoutGrandTotal);
                            cy.log(BalanceAmount);
                            if (EnterAmountField >= (parseFloat(CheckoutGrandTotal))) {
                                expect(parseFloat(BalanceAmount)).to.eq(EnterAmountField - parseFloat(CheckoutGrandTotal));
                            } else {
                                expect(parseFloat(AmountDue)).to.eq(parseFloat(CheckoutGrandTotal) - EnterAmountField);
                            }
                        })
                    })
                })
            }
        })

        // cy.xpath(xpathJson.Pospage.CheckoutSubmitButton).click();
        cy.xpath(xpathJson.Pospage.saveNOPbutton).click();

    })

})