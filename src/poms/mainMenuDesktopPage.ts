import { Locator, Page, expect } from "@playwright/test";

export class MainMenuDesktop {
  private page: Page;
  private products: Locator;
  private solutions: Locator;
  private support: Locator;
  private resources: Locator;
  private partners: Locator;
  private company: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(
      "//button[normalize-space(text())='Products']"
    );
    this.solutions = page.locator(
      "//button[normalize-space(text())='Solutions']"
    );
    this.support = page.locator(
      "//button[contains(@class,'main-navigation__item-title')][normalize-space()='Support']"
    );
    this.resources = page.locator(
      "//button[normalize-space(text())='Resources']"
    );
    this.partners = page.locator(
      "//button[normalize-space(text())='Partners']"
    );
    this.company = page.locator("//button[normalize-space(text())='CXOs']");
  }

  async validateAllComponents(): Promise<void> {
    await expect(this.products).toBeVisible();
    await expect(this.solutions).toBeVisible();
    await expect(this.support).toBeVisible();
    await expect(this.resources).toBeVisible();
    await expect(this.partners).toBeVisible();
    await expect(this.company).toBeVisible();
  }

  async hoverOnProducts(): Promise<void> {
    await this.products.hover();
  }

  async hoverOnSolutions(): Promise<void> {
    await this.solutions.hover();
  }

  async hoverOnSupport(): Promise<void> {
    await this.support.hover();
  }

  async hoverOnResources(): Promise<void> {
    await this.resources.hover();
  }

  async hoverOnPartners(): Promise<void> {
    await this.partners.hover();
  }

  async hoverOnCompany(): Promise<void> {
    await this.company.hover();
  }
}
