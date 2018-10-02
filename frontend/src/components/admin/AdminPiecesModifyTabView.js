import React, {Component} from "react";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import List from "@material-ui/core/List/List";
import AdminPieceItem from "./AdminPieceItem";
import {AdminService} from "../../services";
import {adminPieceScoresLoaded, piecesLoaded} from "../../state/reducers";

class AdminPiecesModifyTabView extends Component {
  constructor(props) {
    super(props);

    AdminService.getPartituurid()
      .then(response => this.props.piecesLoaded(response.data));
  }

  render() {
    return <List component='nav'>
      {
        this.props.pieces.map(p => <AdminPieceItem key={p.id} piece={p}/>)
      }
    </List>;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.toggledAdminPiece !== this.props.toggledAdminPiece && this.props.toggledAdminPiece >= 0) {
      this.props.adminPieceScoresLoaded([]);
      AdminService.getPartiid(this.props.toggledAdminPiece)
        .then(response => this.props.adminPieceScoresLoaded(response.data));
    }
  }
}

const pieceStateToProps = ({pieces, toggledAdminPiece}) => ({
  pieces,
  toggledAdminPiece
});
const pieceDispatchToProps = dispatch => bindActionCreators({
  piecesLoaded,
  adminPieceScoresLoaded
}, dispatch);

export default connect(pieceStateToProps, pieceDispatchToProps)(AdminPiecesModifyTabView);
