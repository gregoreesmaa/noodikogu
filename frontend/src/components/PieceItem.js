import React, {Component} from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {MusicNote} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import {AppContext} from '../Common'

export default class PieceItem extends Component {

  selectScore = (context) => () => {
    context.selectedScore = this.props.obj;
  };

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <ListItem className='piece' button onClick={this.selectScore(context)} component={Link} to='/piece'>
            <ListItemIcon><MusicNote/></ListItemIcon>
            <ListItemText inset primary={this.props.obj.nimi}/>
          </ListItem>
        )}
      </AppContext.Consumer>
    );
  }
}
