import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/hooks";

Given("I am on the login page", async function (this: CustomWorld) {
  await this.loginPage.goto();
  await expect(this.page).toHaveTitle("Login");
});

When("I log in with valid credentials", async function (this: CustomWorld) {
  await this.loginPage.login("tomsmith", "SuperSecretPassword");
});

Then("I should be redirected to the secure area", async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(`${this.loginPage.baseURL}/secure`);
  await expect(this.page).toHaveTitle("Secure Area");
  await expect(this.secureAreaPage.flashMessage).toContainText("You logged into a secure area!");
});
