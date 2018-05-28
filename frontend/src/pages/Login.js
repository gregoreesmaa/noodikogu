import React, {Component} from 'react';
import {Button, TextField} from '@material-ui/core';
import sha512 from 'sha512';
import {AppContext} from '../Common';
import {AuthService} from '../services';

export default class Login extends Component {

  state = {
    username: '',
    password: ''
  };

  login = (setUser, setError) => (event) => {
    console.log('LOGIN');
    let username = this.state.username;
    let password = this.state.password;
    password = sha512(password).toString('hex');
    AuthService.authenticate({username, password})
      .then(
        response => setUser(response.data),
        error => setError('Sisselogimine ebaõnnestus. Proovi uuesti.', error)
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
              label='Kasutajanimi'
              onChange={this.handleFieldChange('username')}
              margin='normal'
            />
            <TextField
              label='Parool'
              onChange={this.handleFieldChange('password')}
              type='password'
              margin='normal'
            />
            <Button type='submit' variant='raised' color='primary'>
              Logi sisse
            </Button>
          </form>
        )}
      </AppContext.Consumer>
    )
  }
}
