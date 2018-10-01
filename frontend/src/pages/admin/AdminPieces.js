import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AdminService} from '../../services';
import {adminPieceScoresLoaded, piecesLoaded} from "../../state/reducers";
import Button from "@material-ui/core/Button/Button";
import AdminPiecesItem from "../../components/admin/AdminPieceItem";
import List from '@material-ui/core/List';

class AdminPieces extends Component {
  constructor(props) {
    super(props);

    AdminService.getPartituurid()
      .then(response => this.props.piecesLoaded(response.data));
  }

  render() {
    return (<div>
        <Button>Muuda lugusid</Button>
        <Button>Lisa uus lugu</Button>
        <List component='nav'>
          {this.props.pieces.map(p => {
            return <AdminPiecesItem key={p.id} adminPiece={p}/>
          })
          }
        </List>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.toggledAdminPiece !== this.props.toggledAdminPiece && this.props.toggledAdminPiece >= 0) {
      this.props.adminPieceScoresLoaded([]);
      AdminService.getPartiid(this.props.toggledAdminPiece)
        .then(response => this.props.adminPieceScoresLoaded(response.data));
    }
  }
}

const mapStateToProps = ({pieces, user, toggledAdminPiece}) => ({pieces, user, toggledAdminPiece});
const mapDispatchToProps = dispatch => bindActionCreators({piecesLoaded, adminPieceScoresLoaded}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminPieces);
