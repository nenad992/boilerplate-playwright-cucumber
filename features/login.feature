@login
Feature: User Authentication

  Background:
    Given the user navigates to the login page

  @smoke @critical
  Scenario: Successful login with valid credentials
    When the user enters valid credentials
    And clicks the login button
    Then the user should be logged in successfully
    And the dashboard should be displayed

  @regression
  Scenario: Failed login with invalid credentials
    When the user enters invalid credentials
    And clicks the login button
    Then an error message should be displayed
    And the user should remain on the login page

  @regression
  Scenario Outline: Login with different credentials
    When the user enters username "<username>"
    And the user enters password "<password>"
    And clicks the login button
    Then the login result should be "<result>"

    Examples:
      | username          | password    | result  |
      | valid@example.com | correct123  | success |
      | invalid@test.com  | wrong       | failure |
      | user@site.com     | pass123     | success |

  @critical
  Scenario: User logout
    Given the user is logged in
    When the user clicks the logout button
    Then the user should be logged out
    And the login page should be displayed

  @regression
  Scenario: Remember me functionality
    When the user checks the "Remember me" checkbox
    And the user enters valid credentials
    And clicks the login button
    And closes and reopens the browser
    Then the user credentials should be remembered
