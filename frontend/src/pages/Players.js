import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { AdminService } from '../services';
import { playersLoaded } from '../state';


class Players extends Component {

  constructor(props) {
    super(props);

    this.componentDidUpdate({});
  }

  render() {
    return this.props.players
      ? (
        <Table className='playerContainer'>
          <TableHead>
            <TableRow>
              <TableCell>Nimi</TableCell>
              <TableCell>Kontaktinfo</TableCell>
              <TableCell>Pillirühmad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.players.map(p => {
              return (
                <TableRow key={p.id}>
                  <TableCell component='th' scope='row'>{p.nimi}</TableCell>
                  <TableCell>{p.kontaktinfo}</TableCell>
                  <TableCell>{p.pillirühmad.map(pr => (
                    <Chip key={pr.id} label={pr.nimi} className='labelChip' />
                  ))}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )
      : (<div />);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      AdminService.getPillimehed()
        .then(response => this.props.playersLoaded(response.data));
    }
  }
}

const mapStateToProps = ({ players, user }) => ({ players, user });
const mapDispatchToProps = dispatch => bindActionCreators({ playersLoaded }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Players);
