import { useState } from "react";

const Event = ({event}) => {
    const [showDetails, setShowDetails] = useState(false);


    return (
        <li 
            className="event"
            key={event.id}
            event={event}>
            <h3>{event.summary}</h3>
            <p>{event.created}</p>
            <p>{event.location}</p>
            <button
                onClick={() => {setShowDetails(!showDetails)}}
            >
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails ? (
                <div className="details" >
                    <h3>About event:</h3>
                    <a href={event.htmlLink}>See details on Google Calender</a>
                    <p>{event.description}</p>
                </div>
            ) : null}
            
        </li>
    );
}

export default Event;