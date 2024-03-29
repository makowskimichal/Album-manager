import { Component } from 'react';
import { login, register } from './AuthService';

export class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: {
        username: '',
        password: ''
      },
      register: {
        username: '',
        password: '',
        mail: ''
      }
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
        <h1 className='authName'>Melomaniac</h1>
        <h2 className='authActionName'>Login</h2>
        <div className="map-list-container">
        <div className='authInput'>
            Username {''}
          </div>
            <input
              className='input'
              type="text"
              value={this.state.login.username}
              onChange={(event) =>
                this.setState({
                  login: {
                    ...this.state.login,
                    username: event.target.value
                  }
                })
              }
            />
          <br />
          <div className='authInput'>
            Password {''}
          </div>
            <input
              className='input'
              type="password"
              value={this.state.login.password}
              onChange={(event) =>
                this.setState({
                  login: {
                    ...this.state.login,
                    password: event.target.value
                  }
                })
              }
            />
          <br />
          <button className="button-3" onClick={() => this.login()}>
            Login
          </button>
        </div>
        <h2 className='authActionName'>Register</h2>
        <div className="map-list-container">
        <div className='authInput'>
            Username {''}
          </div>
            <input
              className='input'
              type="text"
              value={this.state.register.username}
              onChange={(event) =>
                this.setState({
                  register: {
                    ...this.state.register,
                    username: event.target.value
                  }
                })
              }
            />
          <br />
          <div className='authInput'>
            Mail {''}
          </div>
            <input
              className='input'
              type="text"
              value={this.state.register.mail}
              onChange={(event) =>
                this.setState({
                  register: {
                    ...this.state.register,
                    mail: event.target.value
                  }
                })
              }
            />
          <br />
          <div className='authInput'>
            Password {''}
          </div>
            <input
              className='input'
              type="password"
              value={this.state.register.password}
              onChange={(event) =>
                this.setState({
                  register: {
                    ...this.state.register,
                    password: event.target.value
                  }
                })
              }
            />
          <br />
          <button className="button-3" onClick={() => this.register()}>
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}
