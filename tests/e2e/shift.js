const moment = require('moment');
const assert = require("assert");

module.exports = {
    "Test Shift Page Loads": (broswer) => {
        broswer.url("http://localhost:8090/#/shift")
            .waitForElementVisible("body", 5000)
            .assert.visible("shift")
    },

    "Test functionality to create a new shift": (browser) => {
        const testShiftName = `Test_Shift_${new Date().getTime()}`
        let shiftCount = 0
        browser.refresh()
            .waitForElementVisible("body",5000)
            .assert.visible("shift")
            .elements("css selector","md-list-item",(result) => {
                shiftCount = result.value.length;
                console.info(`${shiftCount} shift objects present`)
            })
            .click("button.mat-mini-fab")
            .assert.visible("add-shift-dialog")
            .setValue("input[name='name'", testShiftName)
            .setValue("input[name='Start Date']", new Date())
            .setValue("input[name='End Date']", moment().add(7,'days'))
            .click("md-select[name='Employees']")
            .click("md-option#md-option-0")
            .click("button.submit-ok")
            .expect.element("div.cdk-visually-hidden").text.to.contain(`Successfully saved ${testShiftName}`)
            .after(5000)

        browser.elements("css selector", "md-list-item", (result) => {
                assert.equal(shiftCount + 1, result.value.length, "New Shift added")
            }).end()
    }
}