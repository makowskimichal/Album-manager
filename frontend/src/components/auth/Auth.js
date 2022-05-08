import React from 'react';
import { login, register } from './AuthenticationService';

export class AuthenticationComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: {
                username: '',
                password: '',
            },
            register: {
                username: '',
                password: '',
                mail: '',
            },
        };
    }

    login() {
        login(this.state.login.username, this.state.login.password).then(() => {
            window.location.reload(true);
        });
    }

    register() {
        register(
            this.state.register.username,
            this.state.register.password,
            this.state.register.mail
        ).then(() => {
            window.location.reload(true);
        });
    }

    redirectToList() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h1>Bauhinia</h1>
                <h2>Login</h2>
                <div className="map-list-container">
                    <label>
                        Username:{' '}
                        <input
                            type="text"
                            value={this.state.login.username}
                            onChange={(event) =>
                                this.setState({
                                    login: {
                                        ...this.state.login,
                                        username: event.target.value,
                                    },
                                })
                            }
                        />
                    </label>
                    <br />
                    <label>
                        Password:{' '}
                        <input
                            type="password"
                            value={this.state.login.password}
                            onChange={(event) =>
                                this.setState({
                                    login: {
                                        ...this.state.login,
                                        password: event.target.value,
                                    },
                                })
                            }
                        />
                    </label>
                    <br />
                    <button
                        className="btn btn-primary"
                        onClick={() => this.login()}
                    >
                        Login
                    </button>
                </div>
                <h2>Register</h2>
                <div className="map-list-container">
                    <label>
                        Username:{' '}
                        <input
                            type="text"
                            value={this.state.register.username}
                            onChange={(event) =>
                                this.setState({
                                    register: {
                                        ...this.state.register,
                                        username: event.target.value,
                                    },
                                })
                            }
                        />
                    </label>
                    <br />
                    <label>
                        Mail:{' '}
                        <input
                            type="text"
                            value={this.state.register.mail}
                            onChange={(event) =>
                                this.setState({
                                    register: {
                                        ...this.state.register,
                                        mail: event.target.value,
                                    },
                                })
                            }
                        />
                    </label>
                    <br />
                    <label>
                        Password:{' '}
                        <input
                            type="password"
                            value={this.state.register.password}
                            onChange={(event) =>
                                this.setState({
                                    register: {
                                        ...this.state.register,
                                        password: event.target.value,
                                    },
                                })
                            }
                        />
                    </label>
                    <br />
                    <button
                        className="btn btn-primary"
                        onClick={() => this.register()}
                    >
                        Register
                    </button>
                </div>
            </div>
        );
    }
}
