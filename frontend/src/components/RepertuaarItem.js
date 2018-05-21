import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import PartituurItem from "./PartituurItem";


export default class RepertuaarItem extends Component {

  constructor() {
    super();

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
          <ListItemIcon>
            <LibraryMusicIcon/>
          </ListItemIcon>
          <ListItemText inset primary={this.props.obj.nimi}/>
          {this.state.open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {
              this.props.obj.partituurid.map((partituur, index) => (
                <PartituurItem key={index} obj={partituur}/>
              ))
            }
          </List>
        </Collapse>
      </div>
    );
  }

}
