import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropsRoute } from './Common';
import { AdminService, BackendService } from './services';
import { touchscreenDetected, logOut } from './state';
import { Menu } from './components';
import { Library, Login, Piece } from './pages';
import { AdminPieces, AdminPlayers, AdminPlaylists } from './pages/admin';
import './App.css';
import Players from "./pages/Players";

class App extends Component {

  constructor(props) {
    super(props);

    this.componentDidUpdate({});

    setTimeout(() => document.body.classList.toggle('loaded', true), 1000);
    window.addEventListener('touchstart', this.onTouchStart);

    BackendService.api.interceptors.response.use(null, error => {
      this.props.logOut();
      throw error;
    });
    AdminService.api.interceptors.response.use(null, error => {
      this.props.logOut();
      throw error;
    });
  }

  onTouchStart = () => {
    window.removeEventListener('touchstart', this.onTouchStart);
    this.props.touchscreenDetected();
  }

  setDarkTheme(dark) {
    if (dark) {
      document.body.classList.add('inverted');
    } else {
      document.body.classList.remove('inverted');
    }
  }

  render() {
    /*
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={this.state.showError}
            onClose={() => this.state.clearError()}
            autoHideDuration={6000}
            ContentProps={{ 'aria-describedby': 'message-id' }}
            message={<span id='message-id'>{this.state.error}</span>}
          />*/
    return !this.props.user
      ? (<Login />)
      : (
        <div>
          <Menu />
          <Switch>
            <PropsRoute exact path='/' component={Library} />
            <PropsRoute exact path='/piece' component={Piece} />
            <PropsRoute exact path='/players' component={Players} />
          </Switch>
          {
            this.props.user.tase >= 2
              ? (
                <div className='adminContainer'>
                  <Switch>
                    <PropsRoute exact path='/admin/players' component={AdminPlayers} />
                    <PropsRoute exact path='/admin/pieces' component={AdminPieces} />
                    <PropsRoute exact path='/admin/playlists' component={AdminPlaylists} />
                  </Switch>
                </div>
              )
              : (<div />)
          }
        </div>
      );
  }

  componentDidUpdate(prevProps) {
    if (this.props.dark !== prevProps.dark) {
      this.setDarkTheme(this.props.dark);
    }
  }
}

const mapStateToProps = ({ dark, user }) => ({ dark, user });
const mapDispatchToProps = dispatch => bindActionCreators({ touchscreenDetected, logOut }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
