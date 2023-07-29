#The Meet App

##Project Description
To build a serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.

##How To Get the Project Running
https://dwd369.github.io/meet/

##Project Dependencies
Create React App

#Feature 1 - Show/Hide Event Details
##User Story
As a user, I should be able to filter events by city so that I can see the list of events that
take place in a specific city.
##Scenario
Given the user is searching for upcoming events, when the user enters a city as a filter criteria, then the user should see the list of events in that specific city.

#Feature 2 - Show/Hide Event Details
##User Story
As a user, I should be able to show and hide event details so that view the details of an event when I am interested
##Scenario
Given the list of events are populated on the page, when the user click on show details, then the user should see the event details populated and vice versa


#Feature 3 - Specify Number of Event
##User Story
As a user, I should be able to specify number of events I would like to see on a page so that I can see more or fewer number of events in my search results
##Scenario
Given the user is searching for upcoming events, when the user specify the number of events they would like to see on the page, then the number of search results generated should match the user specified number


#Feature 4 - Use the App When Offline
##User Story
As a user, I should be able to use the app offline so that I can look at events even if I don’t have internet access
##Scenario
Given the user does not have internet connection, when user opens the app, then the user should be able open the app and see the previous results


#Feature 5 - Add an App Shortcut to the Home Screen
##User Story
As a user, I should be able to add the app to my Home Screen via a shortcut so that it is convenient for me to access the app.
##Scenario
Given the user is in the app, when user clicks on the button to add App to Home Screen shortcut, then then shortcut is added to the user’s home screen


#Feature 6 - Display Chart Visualization Event Details
##User Story
As a user, I should be able to see a chart display the events in each city so that I know what events are organized in which city.
##Scenario
Given the user is on the home page of the app, when user lands on the home page, then the user should be able to see a chart show the number of events by each near by city.