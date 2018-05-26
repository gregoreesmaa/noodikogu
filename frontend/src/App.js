import React, {Component} from 'react';
import './App.css';
import Menu from './components/Menu';
import {Route, Switch, withRouter} from 'react-router-dom';
import Noodikogu from './pages/Noodikogu';
import Noot from './pages/Noot';
import Login from './pages/Login';
import {AppContext} from './Context';
import BackendService from "./services/BackendService";
import Snackbar from '@material-ui/core/Snackbar';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      invertTheme: () => {
        let inverted = document.body.classList.toggle('inverted');
        localStorage.setItem('inverted', inverted);
      },
      setUser: (user) => {
        let userJson = JSON.stringify(user);
        localStorage.setItem('user', userJson);

        this.setState({user}, () => this.props.history.push('/'));
      },
      logout: () => {
        localStorage.removeItem('user');
        this.setState({user: null}, () => this.props.history.push('/login'));
      },
      setError: (error) => {
        this.setState({error, showError: true});
      },
      clearError: () => {
        this.setState({error: null, showError: false});
      },
      user: JSON.parse(localStorage.getItem('user')),
      selectedScore: null,
      showError: false,
      error: null
    };

    if (localStorage.getItem('inverted') === 'true') {
      this.state.invertTheme();
    }
    setTimeout(()=>document.body.classList.toggle('loaded', true), 1000);
    if (!this.state.user) {
      this.props.history.push('/login');
    }
    BackendService.api.interceptors.response.use(null, error => {
      this.state.logout();
      throw error;
    });
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className='app'>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={this.state.showError}
            onClose={() => this.state.clearError()}
            autoHideDuration={6000}
            ContentProps={{'aria-describedby': 'message-id'}}
            message={<span id="message-id">{this.state.error}</span>}
          />
          <Menu/>
          <main>
            <Switch>
              <Route exact path='/' component={Noodikogu}/>
              <Route exact path='/noot' component={Noot}/>
              <Route exact path='/login' component={Login}/>
            </Switch>
          </main>
        </div>
      </AppContext.Provider>
    );
  }
}

export default withRouter(App);
