import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LibraryMusic from '@material-ui/icons/LibraryMusic';
import { togglePlaylist } from '../state';
import { PieceItem } from '.';

const PlaylistItem = ({ playlist, playlistsOpen, togglePlaylist }) => (
  <div>
    <ListItem button onClick={() => togglePlaylist(playlist.id)}>
      <ListItemIcon><LibraryMusic /></ListItemIcon>
      <ListItemText inset primary={playlist.nimi} />
      {playlistsOpen[playlist.id] ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse className='playlist' in={playlistsOpen[playlist.id]} timeout='auto' unmountOnExit>
      <List component='div' disablePadding>
        {
          playlist.partituurid.map((piece, index) => (
            <PieceItem key={index} piece={piece} />
          ))
        }
      </List>
    </Collapse>
  </div>
);

const mapStateToProps = ({ playlistsOpen }) => ({ playlistsOpen });
const mapDispatchToProps = dispatch => bindActionCreators({ togglePlaylist }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);
