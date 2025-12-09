const { expect } = require("chai");
const { By } = require("selenium-webdriver");
const { createDriver } = require("../utils/driver");
const LoginPage = require("../pages/LoginPage");
const UserManagementPage = require("../pages/UserManagementPage");

describe("Cambio de rol de un usuario", function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await createDriver();

    // LOGIN
    const loginPage = new LoginPage(driver);
    await loginPage.open();
    await loginPage.login("leorios13@gmail.com", "liceo557");

    expect(await loginPage.isLogged()).to.equal(true);
  });

  after(async () => {
    await driver.quit();
  });

  it("Cambiar rol de cliente a director", async () => {
    const usersPage = new UserManagementPage(driver);

    // Abrir página de gestión de usuarios
    await usersPage.open();
    await driver.sleep(1500);

    // Limpia el filtro de roles (por si quedó en "cliente")
    try {
      const roleFilter = await driver.findElement(By.css("select"));
      await roleFilter.sendKeys("Todos los roles");
      await driver.sleep(500);
    } catch (e) {}

    // Hacer clic en editar el usuario
    const found = await usersPage.clickEditOfUserByEmail("miguel123@correo.com");
    expect(found).to.equal(true);

    // Cambiar rol
    await usersPage.changeRole("director");

    // Esperar que React re-renderice
    await driver.sleep(1200);

    // REFRESCAR TABLA para garantizar recarga de API
    await driver.navigate().refresh();
    await driver.sleep(2000);

    // Leer filas nuevamente
    const rows = await driver.findElements(By.css("table tbody tr"));

    let ok = false;

    for (let row of rows) {
      const nameCell = await row.findElement(By.css("td:nth-child(1)"));
      const name = (await nameCell.getText()).trim().toLowerCase();

      if (name === "miguel") {
        const roleCell = await row.findElement(By.css("td:nth-child(3)"));
        const role = (await roleCell.getText()).trim().toLowerCase();

        console.log("🔍 Rol leído por Selenium:", role);

        if (role === "director") ok = true;
      }
    }

    expect(ok).to.equal(true);
  });
});