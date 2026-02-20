@dashboard
Feature: Dashboard Functionality

  Background:
    Given the user is logged in

  @smoke
  Scenario: Inventory page (dashboard) loads correctly
    Then the dashboard title should be displayed
    And the product list should be visible
    And the product count should be greater than 0

  @smoke @critical
  Scenario: User can logout from the main menu
    When the user opens the main menu
    Then the menu contains "Logout"
    When the user clicks logout
    Then the login page should be displayed

  @regression
  Scenario: Sorting products changes order
    When the user sorts products by "Price (low to high)"
    Then products should be reorderable
