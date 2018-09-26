import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BrightnessMedium from '@material-ui/icons/BrightnessMedium';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Locale from '@material-ui/icons/Language';
import LibraryMusic from '@material-ui/icons/LibraryMusic';
import MenuIcon from '@material-ui/icons/Menu';
import MusicNote from '@material-ui/icons/MusicNote';
import QueueMusic from '@material-ui/icons/QueueMusic';
import Search from '@material-ui/icons/Search';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom';
import { toggleTheme, openMenu, closeMenu, logOut } from '../state';
import {swapLocale} from "../state/reducers";
import {FormattedMessage} from "react-intl";

const userHeader = (user) => (
  <div>
    <ListItem>
      <ListItemText primary={user.pillimees.nimi} />
    </ListItem>
  </div>
);

const generalItems = (toggleTheme) => (
  <div>
    <ListItem button component={Link} to='/'>
      <ListItemIcon><Search /></ListItemIcon>
      <ListItemText primary='Noodikogu' />
    </ListItem>
    <ListItem button component={Link} to='/piece'>
      <ListItemIcon><MusicNote /></ListItemIcon>
      <ListItemText primary='Noot' />
    </ListItem>
    <ListItem button onClick={toggleTheme}>
      <ListItemIcon><BrightnessMedium /></ListItemIcon>
      <ListItemText primary='Taustavalgus' />
    </ListItem>
    <ListItem button component={Link} to='/players'>
      <ListItemIcon><SupervisorAccount /></ListItemIcon>
      <ListItemText primary='Pillimehed' />
    </ListItem>
  </div>
);

const adminItems = () => (
  <div>
    <ListItem button component={Link} to='/admin/players'>
      <ListItemIcon><SupervisorAccount /></ListItemIcon>
      <ListItemText primary='Pillimehed' />
    </ListItem>
    <ListItem button component={Link} to='/admin/pieces'>
      <ListItemIcon><QueueMusic /></ListItemIcon>
      <ListItemText primary={<FormattedMessage id = 'partituurid'/>} />
    </ListItem>
    <ListItem button component={Link} to='/admin/playlists'>
      <ListItemIcon><LibraryMusic /></ListItemIcon>
      <ListItemText primary={<FormattedMessage id="repertuaarid"/>} />
    </ListItem>
  </div>
);

const otherItems = (logOut, swapLocale) => (
  <div>
    <ListItem button onClick={swapLocale}>
      <ListItemIcon><Locale /></ListItemIcon>
      <ListItemText primary={<FormattedMessage id="muudaKeerukust"/>}/>
    </ListItem>
    <ListItem button onClick={logOut}>
      <ListItemIcon><ExitToApp /></ListItemIcon>
      <ListItemText primary='Logi välja' />
    </ListItem>
  </div>
);

const Menu = ({ user, menu, toggleTheme, openMenu, closeMenu, logOut, swapLocale }) => (
  <div>
    <IconButton
      id='menuburger'
      color='inherit'
      aria-label='open drawer'
      onClick={openMenu}>
      <MenuIcon />
    </IconButton>
    <Drawer open={menu} onClose={closeMenu}>
      <div
        tabIndex={0}
        role='button'
        onClick={closeMenu}
        onKeyDown={closeMenu}
      >
        <div>
          <List>{userHeader(user)}</List>
          <Divider />
          <List>{generalItems(toggleTheme)}</List>
          {user.tase >= 2 ? (<div>
            <Divider />
            <List>{adminItems()}</List>
          </div>) : (<div />)}
          <Divider />
          <List>{otherItems(logOut, swapLocale)}</List>
        </div>
      </div>
    </Drawer>
  </div>
);

const mapStateToProps = ({ user, menu }) => ({ user, menu });
const mapDispatchToProps = dispatch => bindActionCreators({ toggleTheme, openMenu, closeMenu, logOut, swapLocale }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
