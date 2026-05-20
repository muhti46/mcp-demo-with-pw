import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../support/BasePage";

export class DropdownPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get simpleDropdown(): Locator {
    return this.page.locator("#dropdown");
  }

  get yearSelect(): Locator {
    return this.page.locator("#year");
  }

  get monthSelect(): Locator {
    return this.page.locator("#month");
  }

  get daySelect(): Locator {
    return this.page.locator("#day");
  }

  get stateSelect(): Locator {
    return this.page.locator("#state");
  }

  get languagesSelect(): Locator {
    return this.page.locator('select[name="Languages"]');
  }

  get heading(): Locator {
    return this.page.locator("h3");
  }

  async goto() {
    await this.navigate("/dropdown");
  }

  async selectRandomSimpleOption(): Promise<string> {
    const options = ["1", "2"];
    const picked = options[Math.floor(Math.random() * options.length)];
    await this.simpleDropdown.selectOption(picked);
    return picked;
  }

  async selectDate(year: string, month: string, day: string) {
    await this.yearSelect.selectOption(year);
    await this.monthSelect.selectOption(month);
    await this.daySelect.selectOption(day);
  }

  async selectRandomState(): Promise<string> {
    const states = [
      "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
      "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
      "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
      "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
      "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
    ];
    const state = states[Math.floor(Math.random() * states.length)];
    await this.stateSelect.selectOption(state);
    return state;
  }

  async selectRandomLanguage(): Promise<string> {
    const langValues = ["java", "js", "c#", "python", "ruby", "c"];
    const picked = langValues[Math.floor(Math.random() * langValues.length)];
    await this.languagesSelect.selectOption(picked);
    return picked;
  }
}
