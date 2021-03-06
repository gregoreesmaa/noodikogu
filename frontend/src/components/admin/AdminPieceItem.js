import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MusicNote from '@material-ui/icons/MusicNote';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete'
import {adminPieceToggled} from '../../state/index';
import ScoreHeaderView from "./ScoreHeaderView";
import GridList from "@material-ui/core/GridList/GridList";
import {AdminService} from "../../services";
import {adminPieceScoresLoaded, piecesLoaded} from "../../state/reducers";
import IconButton from "@material-ui/core/IconButton";

class AdminPieceItem extends Component {

  deleteScore(scoreId) {
    if (window.confirm("Kas kustutada partii?")) {
      AdminService.deleteScore(scoreId)
        .then(() =>
          AdminService.getPartiid(this.props.piece.id)
            .then(response => this.props.adminPieceScoresLoaded(response.data))
        );
    }
  };

  deletePiece() {
    if (window.confirm("Kas kustutada terve partituur?") && window.confirm("Oled kindel, et kustutada terve partituur? Kõik noodifailid kaovad!")) {
      AdminService.deletePiece(this.props.piece.id)
        .then(() =>
          AdminService.getPartituurid()
            .then(response => this.props.piecesLoaded(response.data))
        );
    }
  }

  render() {
    return <div>
      <ListItem button
                onClick={() => this.props.adminPieceToggled(this.props.piece.id)}>
        <ListItemIcon><MusicNote/></ListItemIcon>
        <ListItemText inset primary={this.props.piece.nimi}/>
        <IconButton onClick={() => this.deletePiece()}>
          <DeleteIcon/>
        </IconButton>
        {(this.props.piece.id === this.props.toggledAdminPiece) ?
          <ExpandLess/> : <ExpandMore/>}
      </ListItem>
      <Collapse className='adminPiece'
                in={this.props.piece.id === this.props.toggledAdminPiece}
                timeout='auto'
                unmountOnExit>
        <GridList cellHeight={180}>
          {
            this.props.toggledAdminPieceScores.map(score =>
              <ScoreHeaderView key={score.id} score={score}
                               deleteScore={() => this.deleteScore(score.id)}/>
            )
          }
        </GridList>
      </Collapse>
    </div>;
  }
}


const pieceStateToProps = ({toggledAdminPiece, toggledAdminPieceScores}) => ({
  toggledAdminPiece,
  toggledAdminPieceScores
});
const pieceDispatchToProps = dispatch => bindActionCreators({
  adminPieceToggled,
  adminPieceScoresLoaded,
  piecesLoaded
}, dispatch);

export default connect(pieceStateToProps, pieceDispatchToProps)(AdminPieceItem);
