const { By, until } = require("selenium-webdriver");

class LoginPage {
  constructor(driver) {
    this.driver = driver;

    // URL de tu login en React
    this.url = "http://localhost:5173/login";
  }

  // Abre la página
  async open() {
    await this.driver.get(this.url);
    await this.driver.sleep(1000); // opcional
  }

  // Selectores
  get emailInput() {
    return this.driver.findElement(By.id("username"));
  }

  get passwordInput() {
    return this.driver.findElement(By.id("password"));
  }

  get loginBtn() {
    return this.driver.findElement(By.css("button[type='submit']"));
  }

  // Acción de login
  async login(email, password) {
    await this.emailInput.sendKeys(email);
    await this.passwordInput.sendKeys(password);
    await this.loginBtn.click();
  }

  // Verifica si inició sesión
  async isLogged() {
    try {
      // Espera redirección al dashboard admin
      await this.driver.wait(
        until.urlContains("/admin/dashboard"),
        5000
      );
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = LoginPage;