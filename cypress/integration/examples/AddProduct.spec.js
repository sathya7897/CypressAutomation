/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>
import xpathJson from '/cypress/fixtures/xpath.json';
describe('R1 Add product', function () {
    beforeEach(function () {
        cy.r1Login();
    });

    it('Add product', function () {

        cy.task('getDataFromExcel', 'AddProduct').then((rows) => { // success callback
            if (rows && rows.length > 0) {
                rows.forEach((product) => {
                    cy.xpath(xpathJson.AddProduct.productAddButton).click();
                    cy.xpath(xpathJson.AddProduct.ProductName).type(product.ProductName);
                    cy.xpath(xpathJson.AddProduct.ProductDescription).type(product.ProductDescription);

                    cy.xpath(xpathJson.AddProduct.Category).click();
                    cy.xpath(xpathJson.AddProduct.Categorysearch).type(product.Category);
                    cy.xpath(xpathJson.AddProduct.SelectMatOption.replace('{{replacecode}}', product.Category)).click();

                    cy.xpath(xpathJson.AddProduct.Hsn).type(product.Hsn);
                    cy.xpath(xpathJson.AddProduct.MetaTag).type(product.Metatag);
                    cy.xpath(xpathJson.AddProduct.NewTag).click();
                    cy.xpath(xpathJson.AddProduct.SelectMatOption.replace('{{replacecode}}', product.Selectnewtag)).click();

                    cy.xpath(xpathJson.AddProduct.PricingTab).click();
                    cy.xpath(xpathJson.AddProduct.Mrp).clear().type(product.Mrp);
                    cy.xpath(xpathJson.AddProduct.Price).clear().type(product.Price);
                    cy.xpath(xpathJson.AddProduct.SpecialPrice).clear().type(product.Specialprice);
                    cy.xpath(xpathJson.AddProduct.Tax).clear().type(product.Tax);
                    cy.xpath(xpathJson.AddProduct.Discount).clear().type(product.Discount);
                    cy.xpath(xpathJson.AddProduct.SortOrder).clear().type(product.Sortorder);
                    cy.xpath(xpathJson.AddProduct.OnlinePrice).clear().type(product.Onlineprice);

                    cy.xpath(xpathJson.AddProduct.OnlineStatus).click();
                    cy.xpath(xpathJson.AddProduct.SelectMatOption.replace('{{replacecode}}', product.Onlinestatus)).click();

                    cy.xpath(xpathJson.AddProduct.InventoryTab).click();
                    cy.xpath(xpathJson.AddProduct.Sku).type(product.Sku);
                    cy.xpath(xpathJson.AddProduct.Ean).type(new Date().getTime());
                    cy.xpath(xpathJson.AddProduct.RelatedProducts).type(product.Relatedproducts);
                    cy.xpath(xpathJson.AddProduct.Model).type(product.Model);
                    cy.xpath(xpathJson.AddProduct.Brand).click();
                    cy.xpath(xpathJson.AddProduct.Brandsearch).type(product.Brand);
                    cy.xpath(xpathJson.AddProduct.SelectMatOption.replace('{{replacecode}}', product.Brand)).click();
                    cy.xpath(xpathJson.AddProduct.Quantity).clear().type(product.Quantity);
                    cy.xpath(xpathJson.AddProduct.MinimumOrder).clear().type(product.Minimumorder);
                    cy.xpath(xpathJson.AddProduct.Fnv).click();
                    cy.xpath(xpathJson.AddProduct.SelectMatOption.replace('{{replacecode}}', product.Fnv)).click();
                    cy.xpath(xpathJson.AddProduct.StoreId).type(product.Storeid);
                    cy.task('getDateString', product.Manufacturingdate).then(dateString => {
                        console.log(dateString);
                        cy.xpath(xpathJson.AddProduct.ManufacturingDate).type(dateString);
                    });
                    cy.task('getDateString', product.Expirydate).then(dateString => {
                        console.log(dateString);
                        cy.xpath(xpathJson.AddProduct.ExpiryDate).type(dateString);
                    });

                    cy.xpath(xpathJson.AddProduct.SaveProduct).click();
                    cy.xpath(xpathJson.AddProduct.Okbutton).click();


                })
            }
        });

    })
})