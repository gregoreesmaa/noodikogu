import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MusicNote from '@material-ui/icons/MusicNote';
import { Link } from 'react-router-dom';
import { selectPiece } from '../state';

const PieceItem = ({ piece, selectPiece }) => (
  <ListItem className='piece' button onClick={() => selectPiece(piece)} component={Link} to='/piece'>
    <ListItemIcon><MusicNote /></ListItemIcon>
    <ListItemText inset primary={piece.nimi} />
  </ListItem>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({ selectPiece }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PieceItem);
