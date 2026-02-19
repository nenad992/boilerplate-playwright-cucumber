@profile
Feature: User Profile Management

  Background:
    Given the user is logged in

  @smoke
  Scenario: View user profile information
    When the user navigates to the profile page
    Then the user profile information should be displayed
    And the profile picture should be visible
    And the user name should match the logged-in user

  @regression
  Scenario: Edit user profile
    When the user navigates to the profile page
    And clicks the edit profile button
    And updates the following fields:
      | Field      | Value                |
      | First Name | John                 |
      | Last Name  | Doe                  |
      | Email      | john.doe@example.com |
      | Bio        | Updated bio text     |
    And saves the changes
    Then a success message should be displayed
    And the profile should be updated with the new information

  @critical
  Scenario: Change password
    When the user navigates to account settings
    And clicks on change password
    And enters the current password
    And enters a new password
    And confirms the new password
    And submits the form
    Then a success message should be displayed
    And the password should be changed

  @regression
  Scenario: Upload profile picture
    When the user navigates to the profile page
    And clicks on the profile picture
    And uploads a new profile picture
    Then the picture should be uploaded successfully
    And the profile picture should be updated

  @regression
  Scenario: View account activity
    When the user navigates to account settings
    And clicks on activity log
    Then a list of recent activities should be displayed
    And each activity should show timestamp and action

  @smoke
  Scenario: Manage account preferences
    When the user navigates to preferences
    And toggles email notifications
    And selects notification frequency "Weekly"
    And saves preferences
    Then a success message should be displayed
    And the preferences should be saved
