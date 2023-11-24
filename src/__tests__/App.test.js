import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

import EventList from '../components/EventList';

describe('<App /> component', () => {
    let AppDOM;
    beforeEach(() => {
        AppDOM = render(<App />).container.firstChild;
    })

    // Test to render list of events
    test('render list of events', () => {
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
    });

    // Test to render CitySearch
    test('render CitySearch', () => {
        expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    })

    test('render NumberOfEvents', () => {
        expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
    }) 
});

describe('<App /> integration', () => {
    test('renders a list of events matching the city selected by the user', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
    
        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
    
        await user.type(CitySearchInput, "Berlin");
        const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);
    
        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');   
    
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
          event => event.location === 'Berlin, Germany'
        );
        
        expect(allRenderedEventItems.length).toBe(berlinEvents.length);

        allRenderedEventItems.forEach(event => {
            expect(event.textContent).toContain("Berlin, Germany");
        });
      });
    
    test('renders a list of events matching the number of events specified by the user', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
        const EventNumberTextBox = within(NumberOfEventsDOM).queryByRole('textbox');
        
        await user.type(EventNumberTextBox, "{backspace}{backspace}10");

        expect(EventNumberTextBox).toHaveValue("10");

        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

        const allEvents = await getEvents();
        
        
        expect(allRenderedEventItems.length).toBe(10);
     
    })
});