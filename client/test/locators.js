// Centralized locators for E2E tests
// Export strings only (so tests keep the `By` usage local).
export const LOCATORS = {
  LOGIN: {
    username: "username",
    password: "password",
    submitButtonCss: "button[type='submit']",
  },
  DASHBOARD: {
    directorText: "Panel del Director",
    welcomeText: "Bienvenido,",
  },
  NAV: {
    logoutButtonXPath: "//button//span[text()='Salir']",
    profileLinkXPath: "//a[contains(., 'Perfil')]",
  },
  PROFILE: {
    accountInfoTextXPath: "//*[contains(text(), 'Información de Cuenta')]",
    editButtonXPath: "//button[contains(text(), 'Editar')]",
    firstNameId: "first_name",
    lastNameId: "last_name",
    phoneId: "phone",
    saveButtonXPath: "//button[@type='submit']",
    updatedSuccessXPath: "//*[contains(text(), 'actualizado')]",
  },
};
