import { Locator, Page, expect } from '@playwright/test';

export class RegistrationErrorPage {
	private page: Page;
	private registrationErrorTitle: Locator;
	private mainPageNavigator: Locator;
	private errorMessage: Locator;
	private errorMessageText: string;

	constructor(page: Page) {
		this.page = page;
		this.registrationErrorTitle = page.locator("//h2[normalize-space(text())='R&D Forums - Registration']");
		this.mainPageNavigator = page.locator("span[itemprop='name']");
		this.errorMessage = page.locator('.error');
		this.errorMessageText =
			'Public email are not allowed. Please, be aware that your domain or email address was banned. ' +
			'To find out the reason please contact support by filling the form.';
	}

	async validateAllComponents(): Promise<void> {
		await expect(this.registrationErrorTitle).toBeVisible();
		await expect(this.mainPageNavigator).toBeVisible();
		await expect(this.errorMessage).toBeVisible();
	}

	async validateErrorMessageText(): Promise<void> {
		await expect(this.errorMessage).toContainText(this.errorMessageText);
	}
}
