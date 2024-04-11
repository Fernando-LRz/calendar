import { Calendar } from 'react-big-calendar';
import { addHours } from 'date-fns';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, Navbar } from '../';
import { localizer } from '../../helpers';
import { useState } from 'react';

const events = [
    {
        title: 'Interview',
        notes: '2nd round',
        start: new Date(),
        end: addHours( new Date(), 1 ),
        bgColor: '#fafafa',
        user: {
            id: '123',
            name: 'Fernando'
        }
    }
];

export const CalendarPage = () => {

    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'week' );

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: '#fff'
        };

        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        console.log({ doubleClick: event });
    }

    const onSelect = (event) => {
        console.log({ click: event });
    }

    const onViewChanged = (event) => {
        console.log({ viewChanged: event });

        localStorage.setItem('lastView', event);
        setLastView(event);
    }

    return (
        <>
            <Navbar />
            <Calendar
                culture="en-US" // es
                localizer={ localizer }
                events={ events }
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: "calc(100vh - 80px)" }}
                // messages={ getMessagesEs() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}

                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            />

            <CalendarModal />
        </>
    )
}