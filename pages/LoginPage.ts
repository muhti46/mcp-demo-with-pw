import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../support/BasePage";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get usernameInput(): Locator {
    return this.page.locator('input[name="username"]');
  }

  get passwordInput(): Locator {
    return this.page.locator('input[name="password"]');
  }

  get loginButton(): Locator {
    return this.page.getByRole("button", { name: "Login" });
  }

  get flashMessage(): Locator {
    return this.page.locator("#flash");
  }

  async goto() {
    await this.navigate("/login");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
