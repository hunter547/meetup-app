Feature: SHOW/HIDE AN EVENT'S DETAILS

Scenario: An event element is collapsed by default
Given the main page is open 
When user hasn’t clicked on the event details button
Then results display a grid of unexpanded events

Scenario: User can expand an event to see its details
Given the results display with a grid of events is open
When user clicks the details button
Then details about the event are revealed
And details include address, description, visibility, and link

Scenario: User can collapse an event to hide its details
Given the event details are already expanded (from Scenario 2)
When user clicks the details button again
Then the event details should roll back up into the event
