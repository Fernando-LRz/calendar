import { useEffect } from 'react';
import Swal from 'sweetalert2';

import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

const signUpFormFields = {
    signUpName: '',
    signUpEmail: '',
    signUpPassword: '',
    signUpConfirmedPassword: ''
}

export const LoginPage = () => {

    const { startLogin, startSignUp, errorMessage } = useAuthStore();

    const { 
        loginEmail, 
        loginPassword, 
        onInputChange: onLoginInputChange
    } = useForm(loginFormFields);
    
    const { 
        signUpName,
        signUpEmail, 
        signUpPassword, 
        signUpConfirmedPassword,
        onInputChange: onSignUpInputChange 
    } = useForm(signUpFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }

    const signUpSubmit = (event) => {
        event.preventDefault();

        if(signUpPassword !== signUpConfirmedPassword) {
            Swal.fire('Sign Up Error', 'Passwords do not match', 'error');
            return;
        }

        if(signUpPassword.length < 6) {
            Swal.fire('Sign Up Error', 'The password must be at least 6 characters long', 'error');
            return;
        }

        startSignUp({ name: signUpName, email: signUpEmail, password: signUpPassword });
    }

    useEffect(() => {
        if(errorMessage !== undefined) {
            Swal.fire('Authentication Error', errorMessage, 'error');
        }
    }, [ errorMessage ]);

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Log in</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Log in" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Sign up</h3>
                    <form onSubmit={ signUpSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="signUpName"
                                value={ signUpName }
                                onChange={ onSignUpInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="signUpEmail"
                                value={ signUpEmail }
                                onChange={ onSignUpInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="signUpPassword"
                                value={ signUpPassword }
                                onChange={ onSignUpInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm your password" 
                                name="signUpConfirmedPassword"
                                value={ signUpConfirmedPassword }
                                onChange={ onSignUpInputChange }
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Sign up" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}