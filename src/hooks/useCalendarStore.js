import { useDispatch, useSelector } from 'react-redux';

import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import { convertEventsToDateEvents } from '../helpers';
import { calendarApi } from '../api';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = (calendarEvent) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    }

    const startSavingEvent = async(calendarEvent) => {
        try {
            // Update
            if(calendarEvent.id) {
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
    
                return;
            } 
    
            // Create
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
            
        } catch (error) {
            // console.log(error);

            const { response: { data } } = error;
            Swal.fire('Error', data.msg, 'error');
        }
    }

    const startDeletingEvent = () => {
        dispatch( onDeleteEvent() );
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.events);

            dispatch( onLoadEvents(events) );

        } catch (error) {
            // console.log(error);
        }
    }

    return {
        events, 
        activeEvent,
        hasEventSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}