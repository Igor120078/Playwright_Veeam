import { Locator, Page, expect } from '@playwright/test';

export class RegistrationForm {
	private page: Page;
	private registrationFormTitle: Locator;
	private userNameInput: Locator;
	private passwordInput: Locator;
	private passwordConfirmInput: Locator;
	private emailInput: Locator;
	private timeZoneSelector: Locator;
	private fullNameInput: Locator;
	private submitButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.registrationFormTitle = page.locator("//h2[normalize-space(text())='R&D Forums - Registration']");
		this.userNameInput = page.locator('#username');
		this.passwordInput = page.locator('#new_password');
		this.passwordConfirmInput = page.locator('#password_confirm');
		this.emailInput = page.locator('#email');
		this.timeZoneSelector = page.locator('#timezone');
		this.fullNameInput = page.locator('#pf_fullname');
		this.submitButton = page.locator('#submit');
	}

	async validateAllComponents(): Promise<void> {
		await expect(this.registrationFormTitle).toBeVisible();
		await expect(this.userNameInput).toBeVisible();
		await expect(this.passwordInput).toBeVisible();
		await expect(this.passwordConfirmInput).toBeVisible();
		await expect(this.emailInput).toBeVisible();
		await expect(this.timeZoneSelector).toBeVisible();
		await expect(this.fullNameInput).toBeVisible();
		await expect(this.submitButton).toBeVisible();
	}

	async fillUserName(userName: string): Promise<void> {
		await this.userNameInput.fill(userName);
	}

	async fillPassword(password: string): Promise<void> {
		await this.passwordInput.fill(password);
	}

	async fillPasswordConfirm(password: string): Promise<void> {
		await this.passwordConfirmInput.fill(password);
	}

	async fillEmail(email: string): Promise<void> {
		await this.emailInput.fill(email);
	}

	async selectTimeZone(timeZone: string): Promise<void> {
		await this.timeZoneSelector.selectOption(timeZone);
	}

	async fillFullName(fullName: string): Promise<void> {
		await this.fullNameInput.fill(fullName);
	}

	async fillRegistrationForm(
		userName: string,
		password: string,
		passwordConfirm: string,
		email: string,
		fullName: string,
		timeZone: string
	): Promise<void> {
		await this.fillUserName(userName);
		await this.fillPassword(password);
		await this.fillPasswordConfirm(passwordConfirm);
		await this.fillEmail(email);
		await this.fillFullName(fullName);
		await this.selectTimeZone(timeZone);
	}

	async submitRegistrationForm(): Promise<void> {
		await this.submitButton.click();
	}
}
