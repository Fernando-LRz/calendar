import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';

export const Calendar = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}