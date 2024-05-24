import calendarApi from '../../src/api/calendarApi';

describe('calendarAPi tests', () => {

    test('the base URL should be the one in the environment variables', () => {
        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL );
    });

    test('requests should have the x-token in the header', async() => {
        const token = '123-abc';
        localStorage.setItem('token', token);

        const res = await calendarApi.get('/auth').then(res => res).catch(res => res);
        expect( res.config.headers['x-token'] ).toBe( token );
    });

});