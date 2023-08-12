import { useState } from "react";

const NumberOfEvents = ( {toShow}) => {
    const [numberOfEvents, setNumberOfEvents] = useState(32);

    const handleInputChanged = (event) => {
        let updatedNumber = event.target.value;
        setNumberOfEvents(updatedNumber);
    }

    return(
        <div id='number-of-events'>
            <input
                type="text"
                className="event"
                placeholder="Specify the number of events to display"
                value={numberOfEvents}
                onChange={handleInputChanged}
            />
        </div>
    )

};

export default NumberOfEvents;