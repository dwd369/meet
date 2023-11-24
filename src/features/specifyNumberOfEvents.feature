Feature: Specify number of events

    # Scenario 1
    Scenario: When user hasn't specfied a number, 32 is the default number
        Given the user hasn't specified or filtered the number of events
        When the user sees the list of events
        Then the default number of displayed events will Business Need: 
    
    # Scenario 2
    Scenario: User can change the number of events they want to see.
        Given the user has events displayed
        When the user changes the number of events displayed
        Then the number of events displayed will update to the number the user specified