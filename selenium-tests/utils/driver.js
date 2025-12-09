const { Builder } = require("selenium-webdriver");
require("chromedriver");

async function createDriver() {
  const driver = await new Builder()
    .forBrowser("chrome")
    .build();

  return driver;
}

module.exports = { createDriver };