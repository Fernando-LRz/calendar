export const events = [
    {
        id: '1',
        title: 'Valeria\'s birthday',
        notes: 'Buy a gift for valeria',
        start: new Date('2024-07-08 09:00:00'),
        start: new Date('2024-07-08 15:00:00')
    },
    {
        id: '2',
        title: 'Appointment with the doctor',
        notes: 'Washington #29, GDL',
        start: new Date('2024-07-09 09:00:00'),
        start: new Date('2024-07-09 15:00:00')
    }
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
};

export const calendarWithEventsState = {
    isLoadingEvents: true,
    events: [ ...events ],
    activeEvent: null
};

export const calendarWithEActiveEventState = {
    isLoadingEvents: true,
    events: [ ...events ],
    activeEvent: { ...events[0] }
};