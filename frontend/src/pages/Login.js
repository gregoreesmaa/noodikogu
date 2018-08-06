import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import sha512 from 'sha512';
import { AuthService } from '../services';
import { setUser } from '../state';

let fields = {};
const handleFieldChange = (fieldName) => (event) => Object.assign(fields, { [fieldName]: event.target.value });

const login = (setUser) => (event) => {
  let { username, password } = fields;
  password = sha512(password).toString('hex');
  AuthService.authenticate({ username, password })
    .then(
      response => setUser(response.data),
      error => console.error('Sisselogimine ebaõnnestus. Proovi uuesti.', error)
    );
  event.preventDefault();
};

const Login = ({ setUser }) => (
  <form className={'loginForm'} onSubmit={login(setUser)}>
    <TextField
      label='Kasutajanimi'
      onChange={handleFieldChange('username')}
      margin='normal'
    />
    <TextField
      label='Parool'
      onChange={handleFieldChange('password')}
      type='password'
      margin='normal'
    />
    <Button type='submit' variant='raised' color='primary'>
      Logi sisse
    </Button>
  </form>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setUser
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
