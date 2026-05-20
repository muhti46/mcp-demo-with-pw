import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/hooks";

Given("I am on the registration form page", async function (this: CustomWorld) {
  await this.homePage.goto();
  await this.homePage.clickLinkByName("Registration Form");
  await expect(this.page).toHaveURL(/\/registration_form$/);
});

When("I fill the registration form with random data", async function (this: CustomWorld) {
  await this.registrationFormPage.fillRandomly();
});

When("I submit the registration form", async function (this: CustomWorld) {
  await this.registrationFormPage.submit();
});

Then("the form should be submitted successfully", async function (this: CustomWorld) {
  await expect(this.page.locator("#flash-messages")).toBeVisible();
});
