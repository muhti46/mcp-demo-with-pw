import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../support/BasePage";

export class RegistrationFormPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get firstnameInput(): Locator {
    return this.page.locator('input[name="firstname"]');
  }

  get lastnameInput(): Locator {
    return this.page.locator('input[name="lastname"]');
  }

  get usernameInput(): Locator {
    return this.page.locator('input[name="username"]');
  }

  get emailInput(): Locator {
    return this.page.locator('input[name="email"]');
  }

  get passwordInput(): Locator {
    return this.page.locator('input[name="password"]');
  }

  get phoneInput(): Locator {
    return this.page.locator('input[name="phone"]');
  }

  get birthdayInput(): Locator {
    return this.page.locator('input[name="birthday"]');
  }

  get departmentSelect(): Locator {
    return this.page.locator('select[name="department"]');
  }

  get jobTitleSelect(): Locator {
    return this.page.locator('select[name="job_title"]');
  }

  get submitButton(): Locator {
    return this.page.locator("#wooden_spoon");
  }

  genderRadio(value: string): Locator {
    return this.page.locator(`input[type="radio"][name="gender"][value="${value}"]`);
  }

  programmingCheckbox(name: string): Locator {
    return this.page.getByRole("checkbox", { name, exact: true });
  }

  async fillRandomly() {
    const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Eve"];
    const lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Wilson"];
    const deptValues = ["DE", "DA", "AO", "TRO", "MPDC", "MCTC", "MCR", "MO", "TO"];
    const jobs = ["Designer", "Manager", "Developer", "SDET", "QA", "Scrum Master", "Product Owner", "Project Manager"];
    const genders = ["male", "female", "other"];
    const langs = ["C++", "Java", "JavaScript"];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randNum = Math.floor(Math.random() * 900) + 100;

    await this.firstnameInput.fill(firstName);
    await this.lastnameInput.fill(lastName);
    await this.usernameInput.fill(`${firstName.toLowerCase()}.${lastName.toLowerCase()}`);
    await this.emailInput.fill(`${firstName.toLowerCase()}.${lastName.toLowerCase()}${randNum}@example.com`);
    await this.passwordInput.fill(`Pass${randNum}!`);
    await this.phoneInput.fill(`555-${String(randNum).padStart(3, "0")}-${Math.floor(Math.random() * 9000) + 1000}`);

    const gender = genders[Math.floor(Math.random() * genders.length)];
    await this.genderRadio(gender).check();

    await this.birthdayInput.fill(`0${Math.floor(Math.random() * 9) + 1}/0${Math.floor(Math.random() * 9) + 1}/${Math.floor(Math.random() * 21) + 1980}`);

    const dept = deptValues[Math.floor(Math.random() * deptValues.length)];
    await this.departmentSelect.selectOption(dept);

    const job = jobs[Math.floor(Math.random() * jobs.length)];
    await this.jobTitleSelect.selectOption(job);

    const lang = langs[Math.floor(Math.random() * langs.length)];
    await this.programmingCheckbox(lang).check();
  }

  async submit() {
    await this.submitButton.click();
  }
}
