import { test, expect } from '@playwright/test';
import { HomePage } from '../src/poms/homePage';
import { CookieBar } from '../src/poms/cookieBarPage';
import { MainMenuDesktop } from '../src/poms/mainMenuDesktopPage';
import { MainMenuResources } from '../src/poms/mainMenuResourcesPage';
import { RdForums } from '../src/poms/rdForumsPage';
import { RegistrationTerms } from '../src/poms/registrationTermsPage';
import { RegistrationForm } from '../src/poms/registrationFormPage';
import { RegistrationErrorPage } from '../src/poms/registrationErrorPage';
import testData from '../src/test_data/registrationData.json';

test.afterEach('Close the page', async ({ context }) => {
	await context.close();
});

test('Login with email contains public domain @Login @Negative', async ({ page }) => {
	const homePage = new HomePage(page);
	await homePage.navigate();
	await homePage.validateAllComponents();

	const cookieBar = new CookieBar(page);
	await cookieBar.validateAllComponents();
	await cookieBar.acceptCookies();

	const mainMenu = new MainMenuDesktop(page);
	await mainMenu.validateAllComponents();
	await mainMenu.hoverOnSupport();

	const mainMenuResources = new MainMenuResources(page);
	await mainMenuResources.validateAllComponents();
	await mainMenuResources.rdForumsClick();

	const rdForums = new RdForums(page);
	await rdForums.validateAllComponents();
	await rdForums.registerClick();

	const registrationTerms = new RegistrationTerms(page);
	await registrationTerms.validateAllComponents();
	await registrationTerms.agreeWithTerms();

	const registrationForm = new RegistrationForm(page);
	await registrationForm.validateAllComponents();
	await registrationForm.fillRegistrationForm(
		testData[0].userName,
		testData[0].userPassword,
		testData[0].userPassword,
		testData[0].userEmail,
		testData[0].userFulllName
	);
	await registrationForm.selectTimeZone(testData[0].timeZone);
	await registrationForm.submitRegistrationForm();

	const registrationError = new RegistrationErrorPage(page);
	await registrationError.validateAllComponents();
	await registrationError.validateErrorMessageText();
});
