/* eslint-disable import/order */
import { Locator, Page, expect } from '@playwright/test';

export class RegistrationTerms {
	private page: Page;
	private rdForumsRegistrationTitle: Locator;
	private mainPageNavigator: Locator;
	private agreeTermsBtn: Locator;
	private disagreeTermsBtn: Locator;

	constructor(page: Page) {
		this.page = page;
		this.rdForumsRegistrationTitle = page.locator("//h2[normalize-space(text())='R&D Forums - Registration']");
		this.mainPageNavigator = page.locator("span[itemprop='name']");
		this.agreeTermsBtn = page.locator("input[name='agreed']");
		this.disagreeTermsBtn = page.locator("input[name='not_agreed']");
	}

	async validateAllComponents(): Promise<void> {
		await expect(this.rdForumsRegistrationTitle).toBeVisible();
		await expect(this.mainPageNavigator).toBeVisible();
		await expect(this.agreeTermsBtn).toBeVisible();
		await expect(this.disagreeTermsBtn).toBeVisible();
	}

	async agreeWithTerms(): Promise<void> {
		await this.page.waitForTimeout(1000);
		await this.agreeTermsBtn.click();
		await this.page.waitForLoadState('networkidle');
	}
}
