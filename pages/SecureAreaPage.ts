import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../support/BasePage";

export class SecureAreaPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get secureHeading(): Locator {
    return this.page.getByRole("heading", { level: 2, name: "Secure Area" });
  }

  get welcomeMessage(): Locator {
    return this.page.getByRole("heading", {
      level: 4,
      name: "Welcome to the Secure Area. When you are done click logout below.",
    });
  }

  get homeLink(): Locator {
    return this.page.getByRole("link", { name: "Home" });
  }

  get logoutLink(): Locator {
    return this.page.getByRole("link", { name: "Logout" });
  }

  get cydeoLink(): Locator {
    return this.page.getByRole("link", { name: "CYDEO" });
  }

  get flashClose(): Locator {
    return this.page.locator("#flash a.close");
  }

  get anyButton(): Locator {
    return this.page.locator(
      'button, input[type="button"], input[type="submit"], input[type="reset"]'
    );
  }

  get flashMessage(): Locator {
    return this.page.locator("#flash");
  }

  async verifySecureContent() {
    await expect(this.secureHeading).toBeVisible();
    await expect(this.welcomeMessage).toBeVisible();
    await expect(this.homeLink).toHaveAttribute("href", "/");
    await expect(this.logoutLink).toHaveAttribute("href", "/logout");
    await expect(this.cydeoLink).toHaveAttribute("href", "https://cydeo.com/");
    await expect(this.flashClose).toHaveAttribute("href", "#");
    await expect(this.anyButton).toHaveCount(0);
  }

  async logout() {
    await this.logoutLink.click();
  }
}
