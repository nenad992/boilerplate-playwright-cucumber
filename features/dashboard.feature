@dashboard
Feature: Dashboard Functionality

  Background:
    Given the user is logged in

  @smoke
  Scenario: Dashboard page loads correctly
    When the user navigates to the dashboard
    Then the dashboard title should be displayed
    And all dashboard widgets should be loaded
    And the user profile section should be visible

  @regression
  Scenario: Dashboard displays user statistics
    When the user is on the dashboard
    Then the following statistics should be visible:
      | Statistic   |
      | Total Users |
      | Active Jobs |
      | Revenue     |
      | Conversion  |

  @smoke @critical
  Scenario: Navigation menu is functional
    When the user is on the dashboard
    Then the main menu should contain the following items:
      | Menu Item |
      | Home      |
      | Profile   |
      | Settings  |
      | Logout    |

  @regression
  Scenario: Search functionality works
    When the user enters "test query" in the search box
    And presses Enter
    Then search results should be displayed
    And the results count should be greater than 0

  @regression
  Scenario: Filter and sort operations
    When the user applies filters with the following values:
      | Filter Type | Value      |
      | Date Range  | Last 30    |
      | Status      | Active     |
      | Category    | Premium    |
    And the user sorts by "Date" in descending order
    Then the results should be filtered and sorted correctly
