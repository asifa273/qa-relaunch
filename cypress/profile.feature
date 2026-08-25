Feature: User Profile Management

  As a logged-in user
  I want to view and update my profile details
  So that my information stays current

  Scenario: Update user address
    Given the user is on the profile page
    When the user edits the shipping address and saves it
    Then a success message "Profile updated successfully" should appear
