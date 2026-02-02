import { test } from "@playwright/test";
import { HomePage } from "../src/poms/homePage";
import { CookieBar } from "../src/poms/cookieBarPage";
import { MainMenuDesktop } from "../src/poms/mainMenuDesktopPage";
import { MainMenuSupport } from "../src/poms/mainMenuSupportPage";
import { RdForums } from "../src/poms/rdForumsPage";
import { RegistrationTerms } from "../src/poms/registrationTermsPage";
import { RegistrationForm } from "../src/poms/registrationFormPage";
import { RegistrationErrorPage } from "../src/poms/registrationErrorPage";
import testData from "../src/test_data/registrationData.json";

test.afterEach("Close the page", async ({ context }) => {
  await context.close();
});

test("Login with email contains public domain @Login @Negative", async ({
  page,
}) => {
  const registrationForm = new RegistrationForm(page);

  await test.step("Navigate to Veeam Home Page", async () => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.validateAllComponents();
  });

  await test.step("Accept cookies to continue", async () => {
    const cookieBar = new CookieBar(page);
    await cookieBar.validateAllComponents();
    await cookieBar.acceptCookies();
  });

  await test.step("Hover on Support section of the main menu and navigate to R&D Forums", async () => {
    const mainMenu = new MainMenuDesktop(page);
    await mainMenu.validateAllComponents();
    await mainMenu.hoverOnSupport();
    const mainMenuSupport = new MainMenuSupport(page);
    await mainMenuSupport.validateAllComponents();
    await mainMenuSupport.rdForumsClick();
  });

  await test.step("Validate R&D Forums components and start registration process", async () => {
    const rdForums = new RdForums(page);
    await rdForums.validateAllComponents();
    await rdForums.registerClick();
  });

  await test.step("Validate Registration Terms, agree with terms and fill registration form", async () => {
    const registrationTerms = new RegistrationTerms(page);
    await registrationTerms.validateAllComponents();
    await registrationTerms.agreeWithTerms();

    await registrationForm.validateAllComponents();
    await registrationForm.fillRegistrationForm(
      testData[0].userName,
      testData[0].userPassword,
      testData[0].userPassword,
      testData[0].userEmail,
      testData[0].userFullName,
      testData[0].timeZone,
    );
  });

  await test.step("Submit registration form and validate error message for public domain email", async () => {
    await registrationForm.submitRegistrationForm();
    const registrationError = new RegistrationErrorPage(page);
    await registrationError.validateAllComponents();
    await registrationError.validateErrorMessageText();
  });
});
