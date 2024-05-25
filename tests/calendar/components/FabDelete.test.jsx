import { fireEvent, render, screen } from '@testing-library/react';

import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';

jest.mock('../../../src/hooks/useCalendarStore');

describe('<FabDelete /> tests', () => {

    const mockStartDeletingEvent = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('should render the component correctly', () => {
        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        });

        render( <FabDelete /> );

        const btn = screen.getByLabelText('delete-btn');

        expect( btn.classList ).toContain('btn');
        expect( btn.classList ).toContain('btn-danger');
        expect( btn.classList ).toContain('fab-danger');
        expect( btn.style.display ).toBe('none');
    });

    
    test('should call the function to delete the active event', () => {
        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        });

        render( <FabDelete /> );

        const btn = screen.getByLabelText('delete-btn');
        fireEvent.click(btn);

        expect( btn.style.display ).toBe('');
        expect( mockStartDeletingEvent ).toHaveBeenCalled();
    });

});