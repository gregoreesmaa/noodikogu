import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {AppContext} from '../Context'
import {Link} from "react-router-dom";

export default class PartituurItem extends Component {

  selectScore = (context) => () => {
    context.selectedScore = {
      filename: 'test.svg'
    };
  };

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <ListItem button onClick={this.selectScore(context)} component={Link} to='/noot'>
            <ListItemIcon><MusicNoteIcon/></ListItemIcon>
            <ListItemText inset primary={this.props.obj.nimi}/>
          </ListItem>
        )}
      </AppContext.Consumer>
    );
  }
}
