Feature: Show/Hide Event Details

    # Scenario 1
    Scenario: An event elemtn is collapsed by default.
        Given The user first opens the app
        When The user receives the full list of events (specific for the city or all events)
        Then All events will collapse by default

    # Scenario 2
    Scenario: User can expand an event to see its details.
        Given The user gets a list of events
        When A user selects an event detail
        Then The details will show up for that choosen event

    # Scenario 3
    Scenario: User can collapse an event to hide its details
        Given After the main page is open and the user has clicked on the "Show Details" button
        When the user clicks the "Hide Details" button
        Then the event details are hidden for the specific event