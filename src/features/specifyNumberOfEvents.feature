Feature: SPECIFY NUMBER OF EVENTS

Scenario: When user hasn’t specified a number, 32 is the default number
Given user has not changed default settings
When the user is looking through an events results list
Then 32 events will be displayed per page

Scenario: User can change the number of events they want to see
Given user wants to change the number of events displayed per page
When the user selects a new number of events being displayed
Then the number of events displayed reflect the new number selected

