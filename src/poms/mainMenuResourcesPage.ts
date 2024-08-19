/* eslint-disable import/order */
import { Locator, Page, expect } from '@playwright/test';

export class MainMenuResources {
	private page: Page;
	private getSupport: Locator;
	private trainingAndEducation: Locator;
	private downloads: Locator;
	private renewalCenter: Locator;
	private supportResources: Locator;
	private community: Locator;
	private rdForums: Locator;

	constructor(page: Page) {
		this.page = page;
		this.rdForums = page.locator("//a[normalize-space(text())='R&D Forums']");
		this.getSupport = page.locator("//span[normalize-space(text())='Get Support']");
		this.trainingAndEducation = page.locator("//span[normalize-space(text())='Training & Education']");
		this.downloads = page.locator("//span[normalize-space(text())='Downloads']");
		this.renewalCenter = page.locator("//span[normalize-space(text())='Renewals Center']");
		this.supportResources = page.locator("//span[normalize-space(text())='Support Resources']");
		this.community = page.locator("//span[normalize-space(text())='Community']");
	}

	async validateAllComponents(): Promise<void> {
		await expect(this.getSupport).toBeVisible();
		await expect(this.trainingAndEducation).toBeVisible();
		await expect(this.downloads).toBeVisible();
		await expect(this.renewalCenter).toBeVisible();
		await expect(this.supportResources).toBeVisible();
		expect(this.community).toBeVisible();
		expect(this.rdForums).toBeVisible();
	}

	async rdForumsClick(): Promise<void> {
		await this.rdForums.click();
	}
}
