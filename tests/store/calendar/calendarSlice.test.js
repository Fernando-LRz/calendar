import { 
    calendarSlice, 
    onAddNewEvent, 
    onDeleteEvent, 
    onLoadEvents, 
    onLogoutCalendar, 
    onSetActiveEvent, 
    onUpdateEvent 
} from '../../../src/store/calendar/calendarSlice';

import { 
    calendarWithEActiveEventState, 
    calendarWithEventsState, 
    events, 
    initialState 
} from '../../fixtures/calendarStates';

describe('calendarSlice tests', () => {

    test('should return the initial state', () => {
        expect( calendarSlice.getInitialState() ).toEqual( initialState );
    });

    test('should set the active event', () => {
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent(events[0]) );
        expect( state.activeEvent ).toEqual( events[0] );
    });

    test('should add a new event', () => {
        const event = {
            id: '3',
            title: 'New event',
            notes: 'New notes',
            start: new Date('2024-06-09 10:00:00'),
            start: new Date('2024-06-10 12:00:00')
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent(event) );
        expect( state.events ).toEqual([ ...events, event ]);
    });

    test('should update an event', () => {
        const event = {
            id: '2',
            title: 'Appointment with the cardiologist',
            notes: 'Washington #29',
            start: new Date('2024-07-09 09:00:00'),
            start: new Date('2024-07-09 15:00:00')
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent(event) );
        expect( state.events ).toContain( event );
    });

    test('should delete an event', () => {
        const state = calendarSlice.reducer( calendarWithEActiveEventState, onDeleteEvent() );
        
        expect( state.activeEvent ).toBe( null );
        expect( state.events ).not.toContain( events[0] );
    });

    test('should set the events', () => {
        const state = calendarSlice.reducer( initialState, onLoadEvents(events) );

        expect( state.isLoadingEvents ).toBeFalsy()
        expect( state.events ).toEqual( events );

        calendarSlice.reducer( state, onLoadEvents(events) );
        expect( state.events.length ).toBe( events.length );
    });

    test('should clear the events state', () => {
        const state = calendarSlice.reducer( calendarWithEActiveEventState, onLogoutCalendar() );
        expect( state ).toEqual( initialState );
    });

});