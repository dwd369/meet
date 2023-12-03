import { useState } from "react";

const NumberOfEvents = ( { setCurrentNOE, setErrorAlert}) => {

    const handleInputChanged = (event) => {
        const value = event.target.value;
        let errorText;

        if (Number.isInteger(parseInt(value)) && parseInt(value) <= 32 && parseInt(value) > 0) {
            errorText = "";
            setCurrentNOE(value);
        } else if (!value) {
            errorText = "";
            setCurrentNOE(32);
        } else if (parseInt(value) < 0) {
            errorText = "Only positive numbers are allowed"
        } else if (parseInt(value) > 32) {
            errorText = "Enter the number between 1 and 32"
        } else {
            errorText = "Invalid input. Please enter a valid a number"
        }

        setErrorAlert(errorText);

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