import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Score} from '../Context'
import {Link} from "react-router-dom";

export default class PartituurItem extends Component {

  selectScore = (score) => () => {
    score.filename = 'test.svg';
  };

  render() {
    return (
      <Score.Consumer>
        {score => (
          <ListItem button onClick={this.selectScore(score)} component={Link} to='/noot'>
            <ListItemIcon><MusicNoteIcon/></ListItemIcon>
            <ListItemText inset primary={this.props.obj.nimi}/>
          </ListItem>
        )}
      </Score.Consumer>
    );
  }
}
