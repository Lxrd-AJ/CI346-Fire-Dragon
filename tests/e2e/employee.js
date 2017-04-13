const assert = require("assert");

module.exports = {
    "Test Employee Page Load": (browser) => {
        browser.url("http://localhost:8090/#/employees")
            .waitForElementVisible("body",5000)
            .assert.visible("employee")
    },

    "Test Create Employee": (browser) => {
        let element_count = 0;
        const name = "JJ Doe"
        browser.url("http://localhost:8090/#/employees")
            .waitForElementVisible("body",5000)
            .elements("css selector","md-list-item",(result) => {
                element_count = result.value.length;
                console.log(element_count);
            })
            .click("button.mat-mini-fab")
            .assert.visible("add-employee-dialog")
            .setValue("input[name='name'",name)
            .setValue("input[name='age'","90")
            .click("button.submit-ok")
            .expect.element("div.cdk-visually-hidden").text.to.contain(`Successfully saved ${name}`)
            .after(10000);
        browser.elements("css selector","md-list-item",(result) => {
                console.log(result.value.length)
                assert.equal(element_count + 1, result.value.length);
            })
            .end()   
    }
}