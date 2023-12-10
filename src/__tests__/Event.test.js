import { render } from "@testing-library/react";
import Event from "../components/Event";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";

describe('<Event />', () => {
 
    let EventComponent;
    let allEvents;

    beforeEach(async () => {
        allEvents = await getEvents();
        EventComponent = render(<Event key={allEvents[0].id} event={allEvents[0]} />);
    });

    test('render event summary', () => {
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });

    test('render event start time', () => {
        expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument();
    });

    test('render event location', () => {
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });

    test('render event details button with the title (show details)', () => {
        expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
    });

    test('event details section hidden by default', () => {
        const eventDOM = EventComponent.container.firstChild;
        const details = eventDOM.querySelector('.details');
        expect(details).not.toBeInTheDocument();
    })

    test("show detail section when user clicks on the 'Show Details' button", async () => {
        const eventDOM = EventComponent.container.firstChild;
        const detailsButton = EventComponent.queryByRole('button');

        await userEvent.click(detailsButton);

        const details = eventDOM.querySelector('.details');
        expect(detailsButton).toHaveTextContent('Hide Details');
        expect(details).toBeInTheDocument();
    });

    test("hide detail section when user clicks on the 'Hide Details' button", async () => {
        const eventDOM = EventComponent.container.firstChild;
        const detailsButton = EventComponent.queryByRole('button');

        // show details
        await userEvent.click(detailsButton);

        // hide details
        await userEvent.click(detailsButton);
        const details = eventDOM.querySelector('.details');
        expect(detailsButton).toHaveTextContent('Show Details');
        expect(details).not.toBeInTheDocument();
    })

});