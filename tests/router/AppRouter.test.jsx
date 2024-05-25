import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/calendar/', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}));

describe('<AppRouter /> tests', () => {

    const mockCheckAuthToken = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('should show the loading screen and call the function to check the token', () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render( <AppRouter /> );
        
        expect( screen.getByText('Loading...') ).toBeTruthy();
        expect( mockCheckAuthToken ).toHaveBeenCalled();
    });

    test('should display the login if not authenticated', () => {

        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        // expect( screen.getByText('Log in') ).toBeTruthy();
        expect( container ).toMatchSnapshot();
    });

    test('should display the calendar if authenticated', () => {

        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        expect( screen.getByText('CalendarPage') ).toBeTruthy();
    });

});