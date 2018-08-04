import React, {Component} from 'react';
import {Snackbar} from '@material-ui/core';
import {Switch, withRouter} from 'react-router-dom';
import {AppContext, PropsRoute} from './Common';
import {AdminService, BackendService} from './services';
import {Menu} from './components';
import {Library, Login, Piece} from './pages';
import {AdminPieces, AdminPlayers, AdminPlaylists} from './pages/admin';
import './App.css';

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
      setSelectedScore: (selectedScore) => {
        let scoreJson = JSON.stringify(selectedScore);
        localStorage.setItem('score', scoreJson);

        this.setState({selectedScore});
      },
      logout: () => {
        localStorage.removeItem('user');
        this.setState({user: null}, () => this.props.history.push('/login'));
      },
      setError: (error, log) => {
        this.setState({error, showError: true});
        if (log) {
          console.error(log);
        }
      },
      clearError: () => {
        this.setState({error: null, showError: false});
      },
      user: JSON.parse(localStorage.getItem('user')),
      selectedScore: JSON.parse(localStorage.getItem('score')),
      showError: false,
      error: null
    };

    if (localStorage.getItem('inverted') === 'true') {
      this.state.invertTheme();
    }
    setTimeout(() => document.body.classList.toggle('loaded', true), 1000);
    if (!this.state.user) {
      this.props.history.push('/login');
    }
    BackendService.api.interceptors.response.use(null, error => {
      this.state.logout();
      throw error;
    });
    AdminService.api.interceptors.response.use(null, error => {
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
            message={<span id='message-id'>{this.state.error}</span>}
          />
          <Menu/>
          <Switch>
            <PropsRoute exact path='/' component={Library}/>
            <PropsRoute exact path='/piece' component={Piece} score={this.state.selectedScore}/>
            <PropsRoute exact path='/login' component={Login}/>
            {
              this.state.user && this.state.user.tase >= 2 ? (<div className='adminContainer'>
                <PropsRoute exact path='/admin/players' component={AdminPlayers}/>
                <PropsRoute exact path='/admin/pieces' component={AdminPieces}/>
                <PropsRoute exact path='/admin/playlists' component={AdminPlaylists}/>
              </div>) : (<div/>)
            }
          </Switch>
        </div>
      </AppContext.Provider>
    );
  }
}

export default withRouter(App);
