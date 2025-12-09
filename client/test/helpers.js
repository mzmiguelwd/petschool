import { By, until } from "selenium-webdriver";
import { LOCATORS } from "./locators.js";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

// Performs login and optionally waits for a page element that contains expectedText
export async function login(driver, email, password, expectedText = null) {
  await driver.get(`${BASE_URL}/login`);

  const username = await driver.findElement(By.id(LOCATORS.LOGIN.username));
  const passwd = await driver.findElement(By.id(LOCATORS.LOGIN.password));

  await username.clear();
  await username.sendKeys(email);
  await passwd.clear();
  await passwd.sendKeys(password);

  const submit = await driver.findElement(By.css(LOCATORS.LOGIN.submitButtonCss));
  await submit.click();

  if (expectedText) {
    const xpath = `//*[contains(normalize-space(text()), "${expectedText}")]`;
    await driver.wait(until.elementLocated(By.xpath(xpath)), 10000);
  }
}

export default { login };
