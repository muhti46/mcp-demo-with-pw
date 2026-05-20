Feature: Registration Form Page

  Scenario: Fill registration form with random data and submit
    Given I am on the registration form page
    When I fill the registration form with random data
    And I submit the registration form
    Then the form should be submitted successfully
