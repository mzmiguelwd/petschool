const { By, until } = require("selenium-webdriver");

class UserManagementPage {
  constructor(driver) {
    this.driver = driver;
    this.url = "http://localhost:5173/admin/dashboard"; // Ajustar si es necesario
  }

  async open() {
    await this.driver.get(this.url);
    await this.driver.wait(
      until.elementLocated(By.css("table tbody tr")),
      10000
    );
  }

  // Buscar usuario por email y hacer clic en editar
  async clickEditOfUserByEmail(emailToFind) {
    const rows = await this.driver.findElements(By.css("table tbody tr"));

    for (const row of rows) {
      const emailCell = await row.findElement(By.css("td:nth-child(2)"));
      const email = await emailCell.getText();

      if (email.trim() === emailToFind) {
        const editBtn = await row.findElement(By.css("button.bg-blue-500"));
        await editBtn.click();
        return true;
      }
    }
    return false;
  }

  // Cambiar el rol dentro del formulario
  async changeRole(newRole) {
    // Esperar select
    const select = await this.driver.wait(
      until.elementLocated(By.css("form select")),
      8000
    );

    await select.click();
    await select.findElement(By.css(`option[value="${newRole}"]`)).click();

    // Botón Actualizar
    const updateBtn = await this.driver.findElement(
      By.xpath("//button[contains(text(), 'Actualizar')]")
    );
    await updateBtn.click();

    // 🔥 MANEJAR ALERTA DE ÉXITO PARA EVITAR ERROR
    await this.handleSuccessAlert();

    // Esperar de nuevo la tabla
    await this.driver.wait(
      until.elementLocated(By.css("table tbody tr")),
      8000
    );
  }

  // 🔥 Manejo automático del alert para evitar UnexpectedAlertOpenError
  async handleSuccessAlert() {
    try {
      // Intentar detectar una alerta tipo alert()
      await this.driver.wait(until.alertIsPresent(), 2500);
      const alert = await this.driver.switchTo().alert();

      console.log("⚠️ ALERTA DETECTADA:", await alert.getText());
      await alert.accept(); // cerrar alerta
      console.log("✔ Alerta cerrada");

    } catch (err) {
      // Si no hay alert() nativo, intentar detectar TOAST/Modal de éxito
      try {
        console.log("Buscando toast de éxito…");

        // Ajusta este selector si tu toast tiene otra clase
        const toast = await this.driver.findElement(
          By.css(".toast-success, .bg-green-500, .text-green-600")
        );

        // Esperar a que desaparezca
        await this.driver.wait(until.stalenessOf(toast), 5000);
        console.log("✔ Toast de éxito desapareció");

      } catch (e) {
        // No hay alert ni toast → continuar normal
        console.log("No se encontró alerta ni toast, continuando…");
      }
    }
  }
}

module.exports = UserManagementPage;