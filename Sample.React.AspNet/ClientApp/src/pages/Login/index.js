import React, { useState } from 'react';
import apiFetch from '../../api';
import useAuth from '../../hooks/useAuth'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signin } = useAuth();

    const handleSubmit = () => {

        var loginRequestModel = {
            userName: username
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginRequestModel),
        };

        apiFetch("api/login", options)
            .then(resp => {
                if (!resp.ok) {

                    this.setState({
                        error: "Invalid login or password."
                    });

                    return;
                }

                return resp.json();
            })
            .then(data => {
                signin(data.token);
            })
            .catch(e => console.log(e));
    }

    return (
        <div>
            <section class="vh-100">
                <div class="container-fluid h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-md-9 text-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="img"/>
                        </div>
                        <div class="col-md-9 offset-xl-1">
                            <form class="mt-4">
                                <div class="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form3Example3"
                                        class="form-control form-control-lg"
                                        name="username"
                                        placeholder="Enter a valid email address"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)} />
                                    <label class="form-label" for="form3Example3">Email address</label>
                                </div>

                                <div class="form-outline mb-3">
                                    <input type="password"
                                        id="form3Example4"
                                        class="form-control form-control-lg"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    <label class="form-label" for="form3Example4">Password</label>
                                </div>

                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="form-check mb-0">
                                        <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label class="form-check-label" for="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" class="text-body">Forgot password?</a>
                                </div>

                                <div class="text-center text-lg-start mt-4 pt-2">
                                    <button type="button"
                                        onClick={handleSubmit}
                                        class="btn btn-primary btn-lg"
                                        style={{ 'padding-left': '2.5rem', 'padding-right': '2.5rem;' }}>
                                        Login
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
