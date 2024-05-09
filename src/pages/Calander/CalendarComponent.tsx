import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
//import '@fullcalendar/react/dist/vdom'; 
import { EventClickArg } from '@fullcalendar/common';
import './calender.css';

interface EventType {
    id: string;
    title: string;
    start: string;
    end?: string;
}

interface CalendarComponentProps {
    events: EventType[];
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ events }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState<EventType[]>([]);

    // Event click handler
    const handleEventClick = (arg: EventClickArg) => {
        const clickedDate = arg.event.startStr;
        const filteredEvents = events.filter(event => event.start.startsWith(clickedDate));
        setSelectedEvents(filteredEvents);
        setSelectedDate(new Date(clickedDate));
        setShowPopup(true);
    };

    // Close popup
    const closePopup = () => {
        setShowPopup(false);
        setSelectedEvents([]);
    };

    return (
        <div className="calendar-container">
            {/* FullCalendar component */}
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventClick={handleEventClick as any} 
            />

            {/* Popup window */}
            {showPopup && selectedDate && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Events on {selectedDate.toDateString()}</h3>
                        <ul>
                            {selectedEvents.map(event => (
                                <li key={event.id}>{event.title}</li>
                            ))}
                        </ul>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarComponent;
