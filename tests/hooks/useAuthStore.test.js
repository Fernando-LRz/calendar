import { Provider } from 'react-redux';
import { renderHook, act, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';

import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { testUser } from '../fixtures/testUser';
import { calendarApi } from '../../src/api';
import { useAuthStore } from '../../src/hooks';
import { authSlice } from '../../src/store';

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    });
}

describe('useAuthStore tests', () => {

    beforeEach(() => localStorage.clear());

    test('should return the default values', () => {
        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
        });

        expect( result.current ).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            startLogin: expect.any(Function),
            startSignUp: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function)
        });
    });

    test('should log in successfully', async() => {
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
        });

        const { startLogin } = result.current;

        await act( async() => {
            await startLogin(testUser);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'user', uid: '6650ebd69f0407b7f2f0973f' }
        });

        expect( localStorage.getItem('token') ).toEqual( expect.any(String) );
        expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String) );
    });

    test('the login attempt should fail', async() => {
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
        });

        const { startLogin } = result.current;

        await act( async() => {
            await startLogin({ email: 'user@test.com', password: 'pass' });
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'The password is incorrect',
            status: 'not-authenticated',
            user: {}
        });

        expect( localStorage.getItem('token') ).toBe(null);
        expect( localStorage.getItem('token-init-date') ).toBe(null);

        waitFor(
            () => expect(result.current.errorMessage).toBe(undefined)
        )
    });

    test('should register a user successfully', async() => {
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
        });

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: 'abc123',
                name: 'New user',
                token: 'abc-123'
            }
        });

        const { startSignUp } = result.current;

        await act( async() => {
            await startSignUp(
                { email: 'new.user@test.com', password: 'pass123', name: 'new user' }
            );
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'New user', uid: 'abc123' }
        });

        spy.mockRestore();
    });

    test('user registration should fail', async() => {
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
        });

        const { startSignUp } = result.current;

        await act( async() => {
            await startSignUp(
                { email: 'user@test.com', password: '123456', name: 'new user' }
            );
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'The email is already registered',
            status: 'not-authenticated',
            user: {}
        });
    });

    test('authentication should fail if there is no auth token', async() => {
        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
        });

        const { checkAuthToken } = result.current;

        await act( async() => {
            await checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        });
    });

    test('authentication should be successful if there is an auth token', async() => {
        const { data } = await calendarApi.post('/auth', testUser);
        localStorage.setItem('token', data.token);

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
        });

        const { checkAuthToken } = result.current;

        await act( async() => {
            await checkAuthToken();
        });
    });

});