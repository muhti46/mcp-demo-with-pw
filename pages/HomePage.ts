import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../support/BasePage";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get linkList(): Locator {
    return this.page.locator("a[href]");
  }

  async goto() {
    await this.navigate("/");
  }

  async clickLinkByName(name: string) {
    await this.page.getByRole("link", { name }).click();
  }

  async verifyLinkList(expectedNames: string[]) {
    await expect(this.linkList).toHaveCount(expectedNames.length);
    for (let i = 0; i < expectedNames.length; i++) {
      const link = this.linkList.nth(i);
      await expect(link).toHaveText(expectedNames[i]);
      await expect(link).toBeVisible();
      await expect(link).toBeEnabled();
    }
  }
}
