import { expect, test } from "@playwright/test";

test("successful login and secure page content validation", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/login");

  await expect(page).toHaveTitle("Login");

  await page.locator('input[name="username"]').fill("tomsmith");
  await page.locator('input[name="password"]').fill("SuperSecretPassword");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("https://the-internet-5chk.onrender.com/secure");
  await expect(page).toHaveTitle("Secure Area");
  await expect(page.locator("#flash")).toContainText("You logged into a secure area!");

  await expect(page.getByRole("heading", { level: 2, name: "Secure Area" })).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 4,
      name: "Welcome to the Secure Area. When you are done click logout below.",
    })
  ).toBeVisible();

  await expect(page.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  await expect(page.getByRole("link", { name: "Logout" })).toHaveAttribute("href", "/logout");
  await expect(page.getByRole("link", { name: "CYDEO" })).toHaveAttribute(
    "href",
    "https://cydeo.com/"
  );
  await expect(page.locator("#flash a.close")).toHaveAttribute("href", "#");

  await expect(
    page.locator('button, input[type="button"], input[type="submit"], input[type="reset"]')
  ).toHaveCount(0);

  await page.getByRole("link", { name: "Logout" }).click();
  await expect(page).toHaveURL("https://the-internet-5chk.onrender.com/login");
  await expect(page.locator("#flash")).toContainText("You logged out of the secure area!");

  await page.getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveURL("https://the-internet-5chk.onrender.com/");
  await expect(page).toHaveTitle("Practice");

  const expectedLinkNames = [
    "Home",
    "A/B Testing",
    "Add/Remove Elements",
    "Autocomplete",
    "Basic Auth",
    "Broken Images",
    "Challenging DOM",
    "Checkboxes",
    "Context Menu",
    "Disappearing Elements",
    "Drag and Drop",
    "Drag and Drop Circles",
    "Dropdown",
    "Dynamic Content",
    "Dynamic Controls",
    "Dynamic Loading",
    "Entry Ad",
    "Exit Intent",
    "File Download",
    "File Upload",
    "Floating Menu",
    "Forgot Password",
    "Form Authentication",
    "Frames",
    "Geolocation",
    "Horizontal Slider",
    "Hovers",
    "Infinite Scroll",
    "Inputs",
    "JQuery UI Menus",
    "JavaScript Alerts",
    "JavaScript onload event error",
    "Key Presses",
    "Large & Deep DOM",
    "Multiple Buttons",
    "Multiple Windows",
    "Nested Frames",
    "New tab",
    "Notification Messages",
    "Radio Buttons",
    "Redirect Link",
    "Registration Form",
    "Secure File Download",
    "Shifting Content",
    "Sign Up For Mailing List",
    "Slow Resources",
    "Sortable Data Tables",
    "Status Codes",
    "Typos",
    "WYSIWYG Editor",
    "Web Tables",
    "CYDEO",
  ];

  const links = page.locator("a[href]");
  await expect(links).toHaveCount(52);

  for (let i = 0; i < expectedLinkNames.length; i += 1) {
    const link = links.nth(i);
    await expect(link).toHaveText(expectedLinkNames[i]);
    await expect(link).toBeVisible();
    await expect(link).toBeEnabled();
  }
});
