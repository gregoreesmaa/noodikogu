import React, {Component} from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {MusicNote} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import {AppContext} from '../Common'

export default class PieceItem extends Component {

  render() {
    return (
      <AppContext.Consumer>
        {({setSelectedScore}) => (
          <ListItem className='piece' button onClick={() => setSelectedScore(this.props.obj)} component={Link} to='/piece'>
            <ListItemIcon><MusicNote/></ListItemIcon>
            <ListItemText inset primary={this.props.obj.nimi}/>
          </ListItem>
        )}
      </AppContext.Consumer>
    );
  }
}
