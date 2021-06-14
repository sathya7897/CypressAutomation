/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>

import xpathJson from '/cypress/fixtures/xpath.json';

describe('R1 purchase entry', function () {
    beforeEach(function () {
        cy.viewport(1280, 800);
    });
    let preInventoryValue = {};
    let postInventoryValue = {};
    // for (let count = 0; count < 2; count++) {
    it('PreInventorycheck', function () {
        cy.r1Login();
        cy.viewport(1280, 800);
        cy.xpath(xpathJson.Inventory.Adminfieldclick).click();
        cy.xpath(xpathJson.Inventory.Inventoryclick).click();

        cy.task('getDataFromExcel', 'Purchaseentry').then((rows) => {
            rows.forEach((value) => {
                cy.xpath(xpathJson.Inventory.searchfieldclick).clear();
                cy.xpath(xpathJson.Inventory.searchfieldclick).invoke('val', value.PurchaseEntryEAN).type('{enter}');
                cy.xpath(xpathJson.Inventory.inventoryprice.replace('{{sellingprice}}', value.SellingPrice)).invoke('text').then(inventoryprice => {
                    cy.xpath(xpathJson.Inventory.inventoryqty.replace('{{sellingprice}}', value.SellingPrice)).invoke('text').then(quantityValue => {
                        cy.xpath(xpathJson.Inventory.inventoryvalue.replace('{{sellingprice}}', value.SellingPrice)).invoke('text').then(inventoryValue => {
                            cy.log(inventoryprice);
                            cy.log(quantityValue);
                            cy.log(inventoryValue);
                            preInventoryValue[value.PurchaseEntryEAN] = {
                                "quantity": quantityValue,
                                "inventoryValue": inventoryValue
                            }
                            cy.log(JSON.stringify(preInventoryValue));
                        })
                    })
                })

            })
        })
        cy.log(JSON.stringify(preInventoryValue));
    })

    it('Createpurcahseentry', function () {
        cy.xpath(xpathJson.PurchaseEntry.PurchaseButton).click();
        cy.xpath(xpathJson.PurchaseEntry.PurchaseEntryButton).click();
        cy.xpath(xpathJson.PurchaseEntry.ClickSupplierDetailsButton).click();
        cy.task('getDataFromExcel', 'Purchaseentry').then((rows) => {
            if (rows && rows.length > 0) {
                rows.forEach((product, index) => {
                    if (product.SupplierCode) {
                        cy.xpath(xpathJson.PurchaseEntry.SupplierCode).type(product.SupplierCode).type('{enter}');
                        cy.wait(500);
                        cy.xpath(xpathJson.PurchaseEntry.PoNumber).type(product.PoNumber);
                        cy.task('getDateString', product.PoDate).then(dateString => {
                            console.log(dateString);
                            cy.xpath(xpathJson.PurchaseEntry.PoDate).type(dateString);
                        });
                        cy.xpath(xpathJson.PurchaseEntry.Invoicenumber).type(product.InvoiceNumber);
                        cy.task('getDateString', product.InvoiceDate).then(dateString => {
                            console.log(dateString);
                            cy.xpath(xpathJson.PurchaseEntry.InvoiceDate).type(dateString);
                        });
                        cy.xpath(xpathJson.PurchaseEntry.ClickBrand).click();
                        cy.wait(2000);
                        cy.xpath(xpathJson.PurchaseEntry.SearchBrand).type(product.Brands);
                        cy.xpath(xpathJson.PurchaseEntry.selectMatOption).contains(product.Brands).click();
                    }

                    let PETableRows = xpathJson.PurchaseEntry.PETableRows.replace('{{index}}', index + 1);

                    cy.xpath(PETableRows + xpathJson.PurchaseEntry.PEEan).type(product.PurchaseEntryEAN).type('{enter}');
                    cy.wait(1000);
                    cy.get('body').then((body) => {
                        if (body.find(xpathJson.PurchaseEntry.PEifmultiprice).length) {
                            cy.xpath(xpathJson.PurchaseEntry.PEMultipriceElement.replace('{{replacecode}}', product.SellingPrice)).type('{enter}');
                        }
                        cy.xpath(PETableRows + xpathJson.PurchaseEntry.PEReceivedQuantity).type(product.ReceivedQuantity);
                        cy.xpath(PETableRows + xpathJson.PurchaseEntry.PEHsn).invoke('val').then((PEHsnValue) => {
                            if (!(PEHsnValue && PEHsnValue.length)) {
                                cy.xpath(PETableRows + xpathJson.PurchaseEntry.PEHsn).type(product.Hsn);
                            }
                        })

                        cy.xpath(PETableRows + xpathJson.PurchaseEntry.PEFreeQuantity).type(product.Freequantity);
                        cy.xpath(PETableRows + xpathJson.PurchaseEntry.PECost).type(product.Cost);
                        cy.xpath(PETableRows + xpathJson.PurchaseEntry.PEDiscount).type(product.DiscountAmount);
                        cy.xpath(PETableRows + xpathJson.PurchaseEntry.PESellingprice).type(product.SellingPrice);
                    })
                    cy.wait(2000);


                })
            }
        })
    })
    it('Calculationcheck', function () {
        cy.wait(500);
        cy.task('getDataFromExcel', 'Purchaseentry').then((rows) => {
            cy.wrap(rows).each((value, index) => {
                let PETableRows = xpathJson.PurchaseEntry.PETableRows.replace('{{index}}', index + 1);
                cy.xpath(PETableRows + xpathJson.PurchaseEntry.PETaxamountfield.replace('{index}', index)).invoke('val').then(PETaxamountfield => {
                    cy.xpath(PETableRows + xpathJson.PurchaseEntry.PEdiscountamountfield.replace('{index}', index)).invoke('val').then(PEdiscountamountfield => {
                        cy.xpath(PETableRows + xpathJson.PurchaseEntry.PECost.replace('{index}', index)).invoke('val').then(PECost => {
                            cy.xpath(PETableRows + xpathJson.PurchaseEntry.PEAmount.replace('{index}', index)).invoke('val').then(PEAmount => {
                                cy.xpath(PETableRows + xpathJson.PurchaseEntry.PENetcost.replace('{index}', index)).invoke('val').then(PENetcost => {
                                    cy.xpath(PETableRows + xpathJson.PurchaseEntry.PENetAmount.replace('{index}', index)).invoke('val').then(PENetAmount => {
                                        cy.xpath(PETableRows + xpathJson.PurchaseEntry.PEReceivedQuantity.replace('{index}', index)).invoke('val').then(PEReceivedQuantity => {
                                            let calculatednetcost;
                                            expect(parseFloat(PEReceivedQuantity) * parseFloat(PECost)).to.eq(parseFloat(PEAmount));
                                            calculatednetcost = (parseFloat(PEAmount) + parseFloat(PETaxamountfield || 0)) - parseFloat(PEdiscountamountfield || 0);
                                            expect(parseFloat(calculatednetcost)).to.eq(parseFloat(PENetcost));
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
        cy.xpath(xpathJson.PurchaseEntry.PESaveButton).click();
        cy.wait(1000);
        cy.xpath(xpathJson.PurchaseEntry.PEBackButton).click();
    })
    it('PostInventoryCheck', function () {

        cy.xpath(xpathJson.Inventory.Adminfieldclick).click();
        cy.xpath(xpathJson.Inventory.Inventoryclick).click();
        cy.task('getDataFromExcel', 'Purchaseentry').then((rows) => {
            rows.forEach((value) => {
                cy.wait(1000);
                cy.xpath(xpathJson.Inventory.searchfieldclick).clear();
                cy.xpath(xpathJson.Inventory.searchfieldclick).invoke('val', value.PurchaseEntryEAN).type('{enter}');
                cy.wait(1000);
                cy.xpath(xpathJson.Inventory.inventoryprice.replace('{{sellingprice}}', value.SellingPrice)).invoke('text').then(inventoryprice => {
                    cy.xpath(xpathJson.Inventory.inventoryqty.replace('{{sellingprice}}', value.SellingPrice)).invoke('text').then(quantityValue => {
                        cy.xpath(xpathJson.Inventory.inventoryvalue.replace('{{sellingprice}}', value.SellingPrice)).invoke('text').then(inventoryValue => {
                            cy.log(inventoryprice);
                            cy.log(quantityValue);
                            cy.log(inventoryValue);
                            postInventoryValue[value.PurchaseEntryEAN] = {
                                "quantity": quantityValue,
                                "inventoryValue": inventoryValue
                            }
                            cy.log(postInventoryValue);
                        })
                    })
                })
            })
        })
        cy.wait(5000);
    })
    it('CompareInventoryValues', function () {
        cy.task('getDataFromExcel', 'Purchaseentry').then((rows) => {
            rows.forEach((value) => {
                cy.wait(2000);
                expect(parseInt(postInventoryValue[value.PurchaseEntryEAN].quantity)).to.eq(parseInt(preInventoryValue[value.PurchaseEntryEAN].quantity) + parseInt(value.ReceivedQuantity) + parseInt(value.Freequantity));

            })
        })
    })
    // }
})