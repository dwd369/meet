import { useState } from "react";

const NumberOfEvents = ( { setCurrentNOE}) => {

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setCurrentNOE(value);

    }

    return(
        <div id='number-of-events'>
            <input
                type="text"
                className="event"
                placeholder="Specify the number of events to display"
                defaultValue={32}
                onChange={handleInputChanged}
            />
        </div>
    )
};

export default NumberOfEvents;