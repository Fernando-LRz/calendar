import { useDispatch, useSelector } from 'react-redux';

import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';
import { calendarApi } from '../api';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch( onChecking() );

        try {
            const { data } = await calendarApi.post('/auth', { email, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin({ name: data.name, uid: data.uid }) );
            
        } catch (error) {
            // console.log(error);
            const { response: { data } } = error;
            dispatch( onLogout(data.msg) );

            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    return {
        errorMessage,
        status,
        user,

        startLogin,
    }
}