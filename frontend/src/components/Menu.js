import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SearchIcon from '@material-ui/icons/Search';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from 'react-router-dom';
import {Theme} from '../Context';

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

  render() {
    const generalItems = (
      <div>
        <ListItem button component={Link} to='/'>
          <ListItemIcon>
            <SearchIcon/>
          </ListItemIcon>
          <ListItemText primary="Noodikogu"/>
        </ListItem>
        <ListItem button component={Link} to='/noot'>
          <ListItemIcon>
            <MusicNoteIcon/>
          </ListItemIcon>
          <ListItemText primary="Noot"/>
        </ListItem>
        <Theme.Consumer>
          {
            ({invert}) => (
              <ListItem button onClick={invert}>
                <ListItemIcon>
                  <BrightnessMediumIcon/>
                </ListItemIcon>
                <ListItemText primary="Taustavalgus"/>
              </ListItem>
            )
          }
        </Theme.Consumer>
      </div>
    );
    const otherItems = (
      <div>
        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon/>
          </ListItemIcon>
          <ListItemText primary="Logi välja"/>
        </ListItem>
      </div>
    );
    const sideList = (
      <div>
        <List>{generalItems}</List>
        <Divider/>
        <List>{otherItems}</List>
      </div>
    );
    return (
      <div>
        <IconButton
          id="menuburger"
          color="inherit"
          aria-label="open drawer"
          onClick={() => this.setOpen(true)}>
          <MenuIcon/>
        </IconButton>
        <Drawer open={this.state.open} onClose={() => this.setOpen(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.setOpen(false)}
            onKeyDown={() => this.setOpen(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }

}
