/* eslint-disable import/order */
import { Locator, Page, expect } from '@playwright/test';
import { MainMenuDesktop } from './mainMenuDesktopPage';

export class HomePage {
	private page: Page;
	private downloads: Locator;
	private contactUs: Locator;
	private buyOnline: Locator;
	private logIn: Locator;

	constructor(page: Page) {
		this.page = page;
		this.downloads = page.locator("(//a[@data-event-label='Downloads'])[1]");
		this.contactUs = page.locator("(//button[@data-event-label='Call Veeam'])[1]");
		this.buyOnline = page.locator("(//a[@data-event-label='Buy Online'])[1]");
		this.logIn = page.locator("//a[@data-event-label='Sign In']//span[1]");
	}

	async navigate(): Promise<void> {
		const testUrl = `${process.env.VEEAM_HOME_PAGE_URL}`;
		await this.page.goto(testUrl);
	}

	async goBack(): Promise<void> {
		await this.page.goBack();
	}

	async validateAllComponents(): Promise<void> {
		await expect(this.downloads).toBeVisible();
		await expect(this.contactUs).toBeVisible();
		await expect(this.buyOnline).toBeVisible();
		await expect(this.logIn).toBeVisible();
	}

	// async selectMainMenuPOM(): Promise<MainMenu> {
	// 	const projectName = test.info().project.name;
	// 	if (projectName === 'Tablet_Safari') {
	// 		return new MainMenuTablet(this.page);
	// 	} else {
	// 		return new MainMenuDesktop(this.page);
	// 	}
	// }
}
