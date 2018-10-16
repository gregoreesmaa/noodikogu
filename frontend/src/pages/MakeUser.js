import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import sha512 from "sha512";
import BackendService from "../services/BackendService";

export default class MakeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      jwt: props.match.params.jwt
    };
  }

  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit() {
    if (!this.state.username) {
      alert("Kasutajanimi ei tohi olla tühi");
      return;
    }

    if (!this.state.password) {
      alert("Parool ei tohi olla tühi");
      return;
    }

    const formData = new FormData();
    formData.append('username', this.state.username);
    formData.append('password', sha512(this.state.password).toString('hex'));
    formData.append("jwt", this.state.jwt);
    BackendService.addUser(formData)
      .then(() => alert("Kasutaja loomine õnnestus"));
  }

  render() {
    return (
      <form className={'makeUserForm'} onSubmit={() => this.handleSubmit()}>
        <TextField
          label='Kasutajanimi'
          name='username'
          onChange={event => this.handleFieldChange(event)}
          margin='normal'
        />
        <TextField
          label='Parool'
          name='password'
          type='password'
          onChange={event => this.handleFieldChange(event)}
          margin='normal'
        />
        <Button type='Submit' variant='raised' color='primary'>
          Loo uus kasutaja
        </Button>
      </form>
    );
  }
}
