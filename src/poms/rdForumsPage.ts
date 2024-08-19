/* eslint-disable import/order */
import { Locator, Page, expect } from '@playwright/test';
import { MainMenuDesktop } from './mainMenuDesktopPage';

export class RdForums {
	private page: Page;
	private rdForumsTitle: Locator;
	private register: Locator;
	private login: Locator;

	constructor(page: Page) {
		this.page = page;
		this.rdForumsTitle = page.locator("//h1[normalize-space(text())='R&D Forums']");
		this.register = page.locator("//span[normalize-space(text())='Register']");
		this.login = page.locator("//span[normalize-space(text())='Login']");
	}

	async validateAllComponents(): Promise<void> {
		await expect(this.rdForumsTitle).toBeVisible();
		await expect(this.register).toBeVisible();
		await expect(this.login).toBeVisible();
	}
}
