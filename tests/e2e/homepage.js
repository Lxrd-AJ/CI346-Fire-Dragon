module.exports = {
    "Test Home-Page Load": (browser) => {
        browser.url("http://localhost:8090")
            .waitForElementVisible("body", 5000)
            .assert.title("Fire")
            .assert.visible("span.mat-button-wrapper")
            .click("a.mat-raised-button")
            .pause("1000")
            .assert.containsText("h2.clearfix","Manage Employees")
            .end()
    }
}