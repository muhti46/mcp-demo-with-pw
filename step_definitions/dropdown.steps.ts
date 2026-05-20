import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/hooks";

Given("I am on the dropdown page", async function (this: CustomWorld) {
  await this.dropdownPage.goto();
  await expect(this.page).toHaveURL(/\/dropdown$/);
});

Then("the dropdown page should display correctly", async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/\/dropdown$/);
  await expect(this.dropdownPage.heading).toContainText("Dropdown List");
});

When("I select a date of birth", async function (this: CustomWorld) {
  await this.dropdownPage.selectDate("2020", "5", "15");
});

When("I select a random option from the simple dropdown", async function (this: CustomWorld) {
  await this.dropdownPage.selectRandomSimpleOption();
});

When("I select a random state", async function (this: CustomWorld) {
  await this.dropdownPage.selectRandomState();
});

When("I select a random programming language", async function (this: CustomWorld) {
  await this.dropdownPage.selectRandomLanguage();
});

Then("all dropdown selections should be applied correctly", async function (this: CustomWorld) {
  await expect(this.dropdownPage.yearSelect).toHaveValue("2020");
  await expect(this.dropdownPage.monthSelect).toHaveValue("5");
  await expect(this.dropdownPage.daySelect).toHaveValue("15");

  const val = await this.dropdownPage.simpleDropdown.inputValue();
  expect(["1", "2"]).toContain(val);

  const stateVal = await this.dropdownPage.stateSelect.inputValue();
  expect(stateVal).toBeTruthy();

  const langVal = await this.dropdownPage.languagesSelect.inputValue();
  expect(langVal).toBeTruthy();
});
