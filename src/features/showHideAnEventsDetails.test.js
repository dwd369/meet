import { defineFeature, loadFeature } from "jest-cucumber";
import userEvent from "@testing-library/user-event";
import { render, waitFor, within } from "@testing-library/react";
import App from "../App";

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    // Scenario 1
    test('An event elemtn is collapsed by default.', ({ given, when, then }) => {
        
        let AppComponent;
        given('The user first opens the app', () => {
            AppComponent = render(<App />);
        });

        when('The user receives the full list of events (specific for the city or all events)', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });

        then('All events will collapse by default', () => {
            const eventDOM = AppComponent.container.firstChild;
            const details = eventDOM.querySelector('.details');
            expect(details).not.toBeInTheDocument;
        });
    });

    // Scenario 2
    test('User can expand an event to see its details.', ({ given, when, then }) => {
        let AppComponent;
        given('The user gets a list of events', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            
            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });
        });

        when('A user selects an event detail', async () => {
            const button = AppComponent.queryAllByText('Show Details')[0];
            await userEvent.click(button);
        });

        then('The details will show up for that choosen event', () => {
            const eventDOM = AppComponent.container.firstChild;
            const details = eventDOM.querySelector('.details');
            expect(details).toBeInTheDocument();
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        let AppComponent;
        let button;
        given('After the main page is open and the user has clicked on the "Show Details" button', async () => {
            // render app
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;

            // fetch events
            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });

            // simulate "Show Details" button click
            button = AppComponent.queryAllByText('Show Details')[0];
            await userEvent.click(button);

            // check if details section exist
            const EventDOM = AppComponent.container.firstChild;
            const details = EventDOM.querySelector('.details');
            expect(details).toBeInTheDocument;
        });

        when('the user clicks the "Hide Details" button', async () => {
            await userEvent.click(button);
        });

        then('the event details are hidden for the specific event', () => {
            const EventDOM = AppComponent.container.firstChild;
            const details = EventDOM.querySelector('.details');
            expect(details).not.toBeInTheDocument;
        });


    });

});