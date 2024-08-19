import { test, expect } from '@playwright/test';
import { HomePage } from '../src/poms/homePage';
import { MainMenuDesktop } from '../src/poms/mainMenuDesktopPage';
import { MainMenuResources } from '../src/poms/mainMenuResourcesPage';
import { RdForums } from '../src/poms/rdForumsPage';

test.afterEach('Close the page', async ({ context }) => {
	await context.close();
});

test('Login with email contains public domain @Login @Negative', async ({ page }, testInfo) => {
	const homePage = new HomePage(page);
	await homePage.navigate();
	await homePage.validateAllComponents();

	const mainMenu = new MainMenuDesktop(page);
	await mainMenu.validateAllComponents();
	await mainMenu.hoverOnSupport();

	const mainMenuResources = new MainMenuResources(page);
	await mainMenuResources.validateAllComponents();
	await mainMenuResources.rdForumsClick();

	const rdForums = new RdForums(page);
	await rdForums.validateAllComponents();

	await page.waitForTimeout(1000);

	// const loginPage = new LoginPage(page);

	// let errors: Array<Error> = [];
	// page.addListener('console', (msg) => {
	// 	if (msg.type() === 'error') {
	// 		errors.push(new Error(msg.text()));
	// 	}
	// });

	// await loginPage.validateAllComponents();
	// await loginPage.login();

	// const downloadSalesforce = homePage.getDownloadSalesforce();
	// const projectName = testInfo.project.name;
	// if (projectName === 'Tablet_Safari') {
	// 	await expect(downloadSalesforce).toHaveScreenshot('downloadSalesforceTablet.png');
	// } else {
	// 	await expect(downloadSalesforce).toHaveScreenshot('downloadSalesforce.png');
	// }

	// if (errors.length > 0) {
	// 	console.log('Console errors found:', errors);
	// } else {
	// 	console.log('No Console errors found');
	// }
});
