Feature: Dropdown Page

  Scenario: Interact with all dropdown elements on the dropdown page
    Given I am on the dropdown page
    Then the dropdown page should display correctly
    When I select a date of birth
    And I select a random option from the simple dropdown
    And I select a random state
    And I select a random programming language
    Then all dropdown selections should be applied correctly
