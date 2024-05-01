import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const events = [
    {
        _id: new Date().getTime(),
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

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events,
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if(event._id === payload._id) {
                    return payload;
                }

                return event;
            })
        }
    }
});

// Action creators are generated for each case reducer function
export const { 
    onSetActiveEvent, 
    onAddNewEvent,
    onUpdateEvent
} = calendarSlice.actions;