import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/hooks";

Given("I am logged in", async function (this: CustomWorld) {
  await this.loginPage.goto();
  await this.loginPage.login("tomsmith", "SuperSecretPassword");
  await expect(this.page).toHaveURL(`${this.loginPage.baseURL}/secure`);
});

Then("the secure area page should display correctly", async function (this: CustomWorld) {
  await this.secureAreaPage.verifySecureContent();
});

When("I logout", async function (this: CustomWorld) {
  await this.secureAreaPage.logout();
});

Then("I should be redirected to the login page with a logout message", async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(`${this.loginPage.baseURL}/login`);
  await expect(this.secureAreaPage.flashMessage).toContainText("You logged out of the secure area!");
});
