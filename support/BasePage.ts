import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  protected page: Page;
  readonly baseURL = "https://the-internet-5chk.onrender.com";

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = "") {
    await this.page.goto(`${this.baseURL}${path}`);
  }

  async clickLink(name: string) {
    await this.page.getByRole("link", { name }).click();
  }

  async clickButton(name: string) {
    await this.page.getByRole("button", { name }).click();
  }

  async fillInput(label: string, value: string) {
    await this.page.getByLabel(label).fill(value);
  }

  async selectOption(label: string, value: string) {
    await this.page.getByLabel(label).selectOption(value);
  }

  async checkRadio(label: string) {
    await this.page.getByRole("radio", { name: label }).check();
  }

  async checkCheckbox(label: string) {
    await this.page.getByRole("checkbox", { name: label }).check();
  }

  async selectRandomOption(label: string): Promise<string> {
    const select = this.page.getByLabel(label);
    const options = await select.locator("option").all();
    const validOptions: string[] = [];
    for (const opt of options) {
      const value = await opt.getAttribute("value");
      if (value && value !== "") validOptions.push(value);
    }
    const picked = validOptions[Math.floor(Math.random() * validOptions.length)];
    await select.selectOption(picked);
    return picked;
  }

  async getRandomItem<T>(arr: T[]): Promise<T> {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  async getRandomNumber(min: number, max: number): Promise<number> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async verifyUrl(expectedUrl: string) {
    await expect(this.page).toHaveURL(expectedUrl, { timeout: 15000 });
  }

  async verifyTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifyVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async verifyText(locator: Locator, text: string) {
    await expect(locator).toContainText(text);
  }
}
