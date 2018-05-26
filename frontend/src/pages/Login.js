import React, {Component} from 'react';
import AuthService from "../services/AuthService";
import sha512 from "sha512";
import {AppContext} from '../Context';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class Login extends Component {

  state = {
    username: '',
    password: ''
  };

  login = (setUser, setError) => (event) => {
    let username = this.state.username;
    let password = this.state.password;
    password = sha512(password).toString('hex');
    AuthService.authenticate({username, password})
      .then(
        response => setUser(response.data),
        error => setError('Sisselogimine ebaõnnestus. Proovi uuesti.')
      );
    event.preventDefault();
  };

  handleFieldChange = (fieldName) => (event) => this.setState({[fieldName]: event.target.value});

  render() {
    return (
      <AppContext.Consumer>
        {({setUser, setError}) => (
          <form className={'loginForm'} onSubmit={this.login(setUser, setError)}>
            <TextField
              label="Kasutajanimi"
              onChange={this.handleFieldChange('username')}
              margin="normal"
            />
            <TextField
              label="Parool"
              onChange={this.handleFieldChange('password')}
              type="password"
              margin="normal"
            />
            <Button type="submit" variant="raised" color="primary">
              Logi sisse
            </Button>
          </form>
        )}
      </AppContext.Consumer>
    )
  }
}
