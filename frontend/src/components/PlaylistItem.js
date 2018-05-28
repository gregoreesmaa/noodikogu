import React, {Component} from 'react';
import {Collapse, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {ExpandLess, ExpandMore, LibraryMusic} from '@material-ui/icons';
import {PieceItem} from './';


export default class PlaylistItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleClick = () => {
    this.setState({open: !this.state.open});
  };

  render() {
    return (
      <div>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon><LibraryMusic/></ListItemIcon>
          <ListItemText inset primary={this.props.obj.nimi}/>
          {this.state.open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse className='playlist' in={this.state.open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {
              this.props.obj.partituurid.map((partituur, index) => (
                <PieceItem key={index} obj={partituur}/>
              ))
            }
          </List>
        </Collapse>
      </div>
    );
  }

}
