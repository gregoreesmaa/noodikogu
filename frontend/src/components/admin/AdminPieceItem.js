import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MusicNote from '@material-ui/icons/MusicNote';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {adminPieceToggled} from '../../state/index';
import ScoreView from "../ScoreView";
import ScoreHeaderView from "./ScoreHeaderView";
import GridList from "@material-ui/core/GridList/GridList";

const AdminPieceItem = ({adminPiece, toggledAdminPiece, adminPieceToggled, toggledAdminPieceScores}) => (
  <div>
    <ListItem button onClick={() => adminPieceToggled(adminPiece.id)}>
      <ListItemIcon><MusicNote/></ListItemIcon>
      <ListItemText inset primary={adminPiece.nimi}/>
      {(adminPiece.id === toggledAdminPiece) ? <ExpandLess/> : <ExpandMore/>}
    </ListItem>
    <Collapse className='adminPiece' in={adminPiece.id === toggledAdminPiece} timeout='auto' unmountOnExit>
      <GridList cellHeight={180}>
        {
          toggledAdminPieceScores.map(score =>
            <ScoreHeaderView key={score.id} score={score}/>
          )
        }
      </GridList>
    </Collapse>
  </div>
);

const pieceStateToProps = ({toggledAdminPiece, toggledAdminPieceScores}) => ({
  toggledAdminPiece,
  toggledAdminPieceScores
});
const pieceDispatchToProps = dispatch => bindActionCreators({adminPieceToggled}, dispatch);

export default connect(pieceStateToProps, pieceDispatchToProps)(AdminPieceItem);
