Feature: Secure Area Page

  Scenario: Verify secure area content and logout
    Given I am logged in
    Then the secure area page should display correctly
    When I logout
    Then I should be redirected to the login page with a logout message
