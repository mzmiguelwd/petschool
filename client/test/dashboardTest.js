// E2E tests using selenium-webdriver
// Selenium Manager (included in selenium-webdriver 4.x) automatically downloads the correct chromedriver
// Usage:
// DIRECTOR_EMAIL=director@example.com DIRECTOR_PASSWORD=secret CLIENT_EMAIL=client@example.com CLIENT_PASSWORD=secret BASE_URL=http://localhost:5173 npm run test:e2e

import { Builder, By, until } from "selenium-webdriver";
import { LOCATORS } from "./locators.js";
import { login } from "./helpers.js";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
const DIRECTOR_EMAIL = process.env.DIRECTOR_EMAIL;
const DIRECTOR_PASSWORD = process.env.DIRECTOR_PASSWORD;
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const CLIENT_PASSWORD = process.env.CLIENT_PASSWORD;

async function loginAndCheck(driver, email, password, expectedText) {
	await driver.get(`${BASE_URL}/login`);

	// Reuse shared login helper (waits for expectedText)
	await login(driver, email, password, expectedText);

	// Find and click logout button
		const logoutBtn = await driver.findElement(By.xpath(LOCATORS.NAV.logoutButtonXPath));
	if (!logoutBtn) throw new Error("Logout button not found");

	// Click logout and wait for login page
	await logoutBtn.click();
	await driver.wait(async () => {
		const url = await driver.getCurrentUrl();
		return url.includes("/login");
	}, 5000);
}

async function run() {

	const driver = await new Builder().forBrowser("chrome").build();

	try {
		console.log("🧪 Running E2E tests for both dashboards...\n");

		console.log("→ Testing Director Dashboard");
		await loginAndCheck(driver, DIRECTOR_EMAIL, DIRECTOR_PASSWORD, "Panel del Director");
		console.log("✅ Director dashboard test passed.\n");

		console.log("→ Testing Client Dashboard");
		await loginAndCheck(driver, CLIENT_EMAIL, CLIENT_PASSWORD, "Bienvenido,");
		console.log("✅ Client dashboard test passed.\n");

		console.log("✅ All E2E tests passed.");
		await driver.quit();
		process.exit(0);
	} catch (err) {
		console.error("❌ E2E tests failed:", err.message);
		try {
			await driver.quit();
		} catch (e) {
			/* ignore */
		}
		process.exit(1);
	}
}

// Detect execution as script in ESM environment
if (new URL(import.meta.url).pathname === process.argv[1]) {
	run();
}
