import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { store } from '../../../src/store';

describe('<FabDelete /> tests', () => {

    test('should render the component correctly', () => {

        render(
            <Provider store={ store }>
                <FabDelete />
            </Provider>
        );
    });

});