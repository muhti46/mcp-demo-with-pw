import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/hooks";

Given("I am on the home page", async function (this: CustomWorld) {
  await this.homePage.goto();
  await expect(this.page).toHaveTitle("Practice");
});

Then("all home page links should be displayed correctly", async function (this: CustomWorld) {
  const expectedLinkNames = [
    "Home", "A/B Testing", "Add/Remove Elements", "Autocomplete", "Basic Auth",
    "Broken Images", "Challenging DOM", "Checkboxes", "Context Menu",
    "Disappearing Elements", "Drag and Drop", "Drag and Drop Circles", "Dropdown",
    "Dynamic Content", "Dynamic Controls", "Dynamic Loading", "Entry Ad",
    "Exit Intent", "File Download", "File Upload", "Floating Menu",
    "Forgot Password", "Form Authentication", "Frames", "Geolocation",
    "Horizontal Slider", "Hovers", "Infinite Scroll", "Inputs", "JQuery UI Menus",
    "JavaScript Alerts", "JavaScript onload event error", "Key Presses",
    "Large & Deep DOM", "Multiple Buttons", "Multiple Windows", "Nested Frames",
    "New tab", "Notification Messages", "Radio Buttons", "Redirect Link",
    "Registration Form", "Secure File Download", "Shifting Content",
    "Sign Up For Mailing List", "Slow Resources", "Sortable Data Tables",
    "Status Codes", "Typos", "WYSIWYG Editor", "Web Tables", "CYDEO",
  ];
  await this.homePage.verifyLinkList(expectedLinkNames);
});
