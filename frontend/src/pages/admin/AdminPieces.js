import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { AdminService } from '../../services';
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import {piecesLoaded} from "../../state/reducers";
import Chip from "@material-ui/core/es/Chip/Chip";

class AdminPieces extends Component {
  constructor(props) {
    super(props);

    AdminService.getPartituurid()
      .then(response => this.props.piecesLoaded(response.data));
  }

  render() {
    return(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nimi</TableCell>
            <TableCell>Repertuaarid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.pieces.map(p =>
            <TableRow key={p.id}>
              <TableCell>{p.nimi}</TableCell>
              <TableCell>{p.repertuaarid.map(r =>
                <Chip key={r.id} label={r.nimi} className='labelChip'/>
              )}</TableCell>
            </TableRow>)
          }
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = ({ pieces, user }) => ({ pieces, user });
const mapDispatchToProps = dispatch => bindActionCreators({ piecesLoaded }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminPieces);
