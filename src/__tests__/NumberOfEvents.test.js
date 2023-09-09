import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe('<NumberOfEvents /> component', () => {
    
    let NumberOfEventsComponet;
    let EventNumberTextBox;
    
    beforeEach(() => {
        NumberOfEventsComponet = render(<NumberOfEvents setCurrentNOE={() => {}}/>);
        EventNumberTextBox = NumberOfEventsComponet.queryByRole('textbox');
    })

    test('render text input', () => {
        expect(EventNumberTextBox).toBeInTheDocument();
    });

    test('render default number of events to show for text input', () => {
        expect(EventNumberTextBox).toHaveValue("32");
    });

    test('update number of events value when user types in a new number', async () => {
        await userEvent.type(EventNumberTextBox, '{backspace}{backspace}10');
        expect(EventNumberTextBox).toHaveValue("10");
    });

});