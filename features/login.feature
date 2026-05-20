Feature: Login Page

  Scenario: Login with valid credentials
    Given I am on the login page
    When I log in with valid credentials
    Then I should be redirected to the secure area
