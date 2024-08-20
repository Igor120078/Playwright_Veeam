/* eslint-disable import/order */
import { Locator, Page, expect } from '@playwright/test';

export class CookieBar {
	private page: Page;
	private cookiesAcceptBtn: Locator;
	private cookiesDeclineBtn: Locator;

	constructor(page: Page) {
		this.page = page;
		this.cookiesAcceptBtn = page.locator('#cookiescript_accept');
		this.cookiesDeclineBtn = page.locator('#cookiescript_reject');
	}

	async validateAllComponents(): Promise<void> {
		await expect(this.cookiesAcceptBtn).toBeVisible();
		await expect(this.cookiesDeclineBtn).toBeVisible();
	}

	async acceptCookies(): Promise<void> {
		await this.cookiesAcceptBtn.click();
	}
}
