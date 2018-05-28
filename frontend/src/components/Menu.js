import React, {Component} from 'react';
import {Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {
  BrightnessMedium,
  ExitToApp,
  LibraryMusic,
  Menu as MenuIcon,
  MusicNote,
  QueueMusic,
  Search,
  SupervisorAccount
} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import {AppContext} from '../Common';

export default class Menu extends Component {

  constructor() {
    super();
    this.state = {
      open: false
    }
  }

  setOpen(open) {
    this.setState({
      open
    });
  };

  userHeader = (user) => (
    <div>
      <ListItem>
        <ListItemText primary={user.pillimees.nimi}/>
      </ListItem>
    </div>
  );

  generalItems = (invertTheme) => (
    <div>
      <ListItem button component={Link} to='/'>
        <ListItemIcon><Search/></ListItemIcon>
        <ListItemText primary='Noodikogu'/>
      </ListItem>
      <ListItem button component={Link} to='/piece'>
        <ListItemIcon><MusicNote/></ListItemIcon>
        <ListItemText primary='Noot'/>
      </ListItem>
      <ListItem button onClick={invertTheme}>
        <ListItemIcon><BrightnessMedium/></ListItemIcon>
        <ListItemText primary='Taustavalgus'/>
      </ListItem>
    </div>
  );

  adminItems = () => (
    <div>
      <ListItem button component={Link} to='/admin/players'>
        <ListItemIcon><SupervisorAccount/></ListItemIcon>
        <ListItemText primary='Pillimehed'/>
      </ListItem>
      <ListItem button component={Link} to='/admin/pieces'>
        <ListItemIcon><QueueMusic/></ListItemIcon>
        <ListItemText primary='Partituurid'/>
      </ListItem>
      <ListItem button component={Link} to='/admin/playlists'>
        <ListItemIcon><LibraryMusic/></ListItemIcon>
        <ListItemText primary='Repertuaarid'/>
      </ListItem>
    </div>
  );

  otherItems = (logout) => (
    <div>
      <ListItem button onClick={logout}>
        <ListItemIcon><ExitToApp/></ListItemIcon>
        <ListItemText primary='Logi välja'/>
      </ListItem>
    </div>
  );

  render() {
    return (
      <AppContext.Consumer>
        {({user, invertTheme, logout}) => user ? (
          <div>
            <IconButton
              id='menuburger'
              color='inherit'
              aria-label='open drawer'
              onClick={() => this.setOpen(true)}>
              <MenuIcon/>
            </IconButton>
            <Drawer open={this.state.open} onClose={() => this.setOpen(false)}>
              <div
                tabIndex={0}
                role='button'
                onClick={() => this.setOpen(false)}
                onKeyDown={() => this.setOpen(false)}
              >
                <div>
                  <List>{this.userHeader(user)}</List>
                  <Divider/>
                  <List>{this.generalItems(invertTheme)}</List>
                  {user.tase >= 2 ? (<div>
                    <Divider/>
                    <List>{this.adminItems()}</List>
                  </div>) : (<div/>)}
                  <Divider/>
                  <List>{this.otherItems(logout)}</List>
                </div>
              </div>
            </Drawer>
          </div>
        ) : (<div/>)}
      </AppContext.Consumer>
    );
  }

}
