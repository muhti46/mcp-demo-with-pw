import { BeforeAll, AfterAll, Before, After, setWorldConstructor, World, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page } from "playwright";
import { BasePage } from "./BasePage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SecureAreaPage } from "../pages/SecureAreaPage";
import { RegistrationFormPage } from "../pages/RegistrationFormPage";
import { DropdownPage } from "../pages/DropdownPage";

setDefaultTimeout(30000);

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  basePage!: BasePage;
  homePage!: HomePage;
  loginPage!: LoginPage;
  secureAreaPage!: SecureAreaPage;
  registrationFormPage!: RegistrationFormPage;
  dropdownPage!: DropdownPage;
}

setWorldConstructor(CustomWorld);

BeforeAll(async function () {
  // Browser is launched per scenario for isolation
});

AfterAll(async function () {
  // Cleanup handled per scenario
});

Before(async function () {
  this.browser = await chromium.launch({ headless: process.env.HEADED !== "true" });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.basePage = new BasePage(this.page);
  this.homePage = new HomePage(this.page);
  this.loginPage = new LoginPage(this.page);
  this.secureAreaPage = new SecureAreaPage(this.page);
  this.registrationFormPage = new RegistrationFormPage(this.page);
  this.dropdownPage = new DropdownPage(this.page);
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
