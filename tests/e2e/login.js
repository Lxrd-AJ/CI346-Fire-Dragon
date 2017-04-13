const assert = require("assert");

const username = `test_username_${new Date().getTime()}`;
const password = Math.random().toString(36).substr(2,10);

module.exports = {
    "Test Page loaded": (browser) => {
        browser.url("http://localhost:8090/#/login")
            .waitForElementVisible("body", 5000)
            .assert.visible("login")
    },

    "Testing functionality to create account": (browser) => {
        browser.refresh()
            .waitForElementVisible("body", 5000)
            .setValue("input[name='username']", username)
            .setValue("input[name='password']", password)
            .click("md-checkbox")
            .click("button[type='submit']")
            .expect.element("div.cdk-visually-hidden").text.to.contain(`Account created and authenticated`)
            .after(5000);
        browser.assert.urlEquals("http://localhost:8090/#/");
        browser.expect.element("li.nav-item.user").text.to.equal(username);
        browser.end();
    },

    "Test functionality to login": (browser) => {
        browser.url("http://localhost:8090/#/login")
            .waitForElementVisible("body",5000)
            .setValue("input[name='username']", username)
            .setValue("input[name='password']", password)
            .click("button[type='submit']")
            .expect.element("div.cdk-visually-hidden").text.to.contain(`Successfully authenticated`)
            .after(5000);
        browser.assert.urlEquals("http://localhost:8090/#/")
        browser.expect.element("li.nav-item.user").text.to.equal(username);
        browser.end();
    }
}