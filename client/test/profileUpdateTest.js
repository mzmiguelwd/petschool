// E2E test for Client Profile Update
// Selenium Manager (included in selenium-webdriver 4.x) automatically downloads the correct chromedriver
// Usage:
// CLIENT_EMAIL=client@example.com CLIENT_PASSWORD=secret BASE_URL=http://localhost:5173 npm run test:e2e:profile

import { Builder, By, until } from "selenium-webdriver";
import { LOCATORS } from "./locators.js";
import { login } from "./helpers.js";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const CLIENT_PASSWORD = process.env.CLIENT_PASSWORD;

function assertEnv() {
	const missing = [];
	if (!CLIENT_EMAIL) missing.push("CLIENT_EMAIL");
	if (!CLIENT_PASSWORD) missing.push("CLIENT_PASSWORD");
	if (missing.length) {
		throw new Error(
			`Missing env vars for tests: ${missing.join(", ")}. Set them and retry.`
		);
	}
}

async function loginAndUpdateProfile(driver, email, password) {
	// Navigate to login

	// Fill login form



	await login(driver, email, password, LOCATORS.DASHBOARD.welcomeText);

	// Navigate to profile
		const profileLink = await driver.findElement(By.xpath(LOCATORS.NAV.profileLinkXPath));
	await profileLink.click();

	// Wait for profile page to load
		await driver.wait(
			until.elementLocated(By.xpath(LOCATORS.PROFILE.accountInfoTextXPath)),
			5000
		);

	// Wait a bit for page to fully load
	await driver.sleep(500);

	// Find and click Edit button
		const editButton = await driver.findElement(By.xpath(LOCATORS.PROFILE.editButtonXPath));
	await editButton.click();

	// Wait for form to become editable
	await driver.sleep(500);

	// Update profile fields
	const firstNameInput = await driver.findElement(By.id(LOCATORS.PROFILE.firstNameId));
	const lastNameInput = await driver.findElement(By.id(LOCATORS.PROFILE.lastNameId));
	const phoneInput = await driver.findElement(By.id(LOCATORS.PROFILE.phoneId));

	// Clear and update first name
	await firstNameInput.clear();
	await firstNameInput.sendKeys("TestNombre");

	// Clear and update last name
	await lastNameInput.clear();
	await lastNameInput.sendKeys("TestApellido");

	// Clear and update phone
	await phoneInput.clear();
	await phoneInput.sendKeys("3178343334");

	// Wait for inputs to update
	await driver.sleep(300);

	// Find and click Save button (submit form)
		const saveButton = await driver.findElement(By.xpath(LOCATORS.PROFILE.saveButtonXPath));
	await saveButton.click();

	// Wait for success message or confirmation
		await driver.wait(
			until.elementLocated(By.xpath(LOCATORS.PROFILE.updatedSuccessXPath)),
			5000
		);

	// Verify updated data is displayed
	const updatedFirstName = await driver.findElement(By.id(LOCATORS.PROFILE.firstNameId));
	const firstNameValue = await updatedFirstName.getAttribute("value");

	if (firstNameValue !== "TestNombre") {
		throw new Error(`Profile update failed. Expected 'TestNombre', got '${firstNameValue}'`);
	}
}

async function loginAndUpdateProfileInvalidPhone(driver, email, password) {
	// Navigate to login

	// Fill login form



	// Wait for dashboard to load
	await login(driver, email, password, LOCATORS.DASHBOARD.welcomeText);

	// Navigate to profile
	const profileLink = await driver.findElement(By.xpath(LOCATORS.NAV.profileLinkXPath));
	await profileLink.click();

	// Wait for profile page to load
	await driver.wait(
		until.elementLocated(By.xpath(LOCATORS.PROFILE.accountInfoTextXPath)),
		5000
	);

	await driver.sleep(500);

	// Click Edit
	const editButton = await driver.findElement(By.xpath(LOCATORS.PROFILE.editButtonXPath));
	await editButton.click();

	await driver.sleep(500);

	// Set invalid phone (non-numeric)
	const phoneInput = await driver.findElement(By.id(LOCATORS.PROFILE.phoneId));
	await phoneInput.clear();
	await phoneInput.sendKeys("no-es-numero");

	await driver.sleep(300);

	// Submit
	const saveButton = await driver.findElement(By.xpath(LOCATORS.PROFILE.saveButtonXPath));
	await saveButton.click();

	// Wait briefly and check that a success message did NOT appear
	await driver.sleep(1000);
	const successElements = await driver.findElements(By.xpath(LOCATORS.PROFILE.updatedSuccessXPath));
	if (successElements.length > 0) {
		throw new Error("Expected validation error for invalid phone, but update succeeded");
	}
}

async function run() {
	assertEnv();

	const driver = await new Builder().forBrowser("chrome").build();

	try {
		console.log("🧪 Running profile update E2E test...\n");

		await loginAndUpdateProfile(driver, CLIENT_EMAIL, CLIENT_PASSWORD);
		console.log("✅ Profile update test passed.");

		console.log("→ Testing Profile: invalid phone validation");
		await loginAndUpdateProfileInvalidPhone(driver, CLIENT_EMAIL, CLIENT_PASSWORD);
		console.log("✅ Profile invalid-phone test passed.");
		await driver.quit();
		process.exit(0);
	} catch (err) {
		console.error("❌ Profile update test failed:", err.message);
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
