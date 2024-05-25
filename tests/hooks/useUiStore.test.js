import { Provider } from 'react-redux';
import { renderHook, act } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';

import { useUiStore } from '../../src/hooks';
import { uiSlice } from '../../src/store';

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    });
}

describe('useUiStore tests', () => {

    test('should return the default values', () => {
        const mockStore = getMockStore({ isDateModalOpen: false });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
        });

        expect( result.current ).toEqual({
            isDateModalOpen: false,
            closeDateModal: expect.any(Function),
            openDateModal: expect.any(Function),
        });
    });

    test('isDateModal should change to true', () => {
        const mockStore = getMockStore({ isDateModalOpen: false });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
        });

        const { openDateModal } = result.current;

        act(() => {
            openDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeTruthy();
    });

    test('isDateModal should change to false', () => {
        const mockStore = getMockStore({ isDateModalOpen: true });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => 
                <Provider store={ mockStore }>
                    { children }
                </Provider>
        });

        const { closeDateModal } = result.current;

        act(() => {
            closeDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeFalsy();
    });

});