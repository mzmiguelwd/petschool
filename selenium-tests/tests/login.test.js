const { expect } = require("chai");
const { createDriver } = require("../utils/driver");
const LoginPage = require("../pages/LoginPage");

describe("Login del administrador", function () {
  this.timeout(20000);
  let driver;

  before(async () => {
    driver = await createDriver();
  });

  after(async () => {
    await driver.quit();
  });

  it("El admin puede iniciar sesión", async () => {
    const loginPage = new LoginPage(driver);

    await loginPage.open();
    await loginPage.login("leorios13@gmail.com", "liceo557"); // AJUSTAR

    const ok = await loginPage.isLogged();
    expect(ok).to.equal(true);
  });
});