import { authSlice, clearErrorMessage, onLogin, onLogout } from '../../../src/store/auth/authSlice';
import { authenticatedState, initialState } from '../../fixtures/authStates';
import { testUser } from '../../fixtures/testUser';

describe('authSlice tests', () => {

    test('should return the initial state', () => {
        expect( authSlice.getInitialState() ).toEqual( initialState );
    });

    test('should log in', () => {
        const state = authSlice.reducer( initialState, onLogin( testUser ) );

        expect( state ).toEqual({
            status: 'authenticated',
            user: testUser,
            errorMessage: undefined
        });
    });

    test('should log out', () => {
        const state = authSlice.reducer( authenticatedState, onLogout() );

        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        });
    });

    test('should log out and set the response message', () => {
        const errorMessage = 'Incorrect password';
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );

        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        });
    });

    test('should clear the error message', () => {
        const errorMessage = 'Incorrect password';
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );

        const newState = authSlice.reducer( state, clearErrorMessage() );
        expect( newState.errorMessage ).toBe( undefined );
    });

});