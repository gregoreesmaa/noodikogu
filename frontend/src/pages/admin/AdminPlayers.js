import React, {Component} from 'react';
import {Chip, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {AdminService} from '../../services';

export default class AdminPlayers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      players: []
    };

    AdminService.getPillimehed()
      .then(response => this.setState({players: response.data}));
  }

  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nimi</TableCell>
            <TableCell>Kasutajanimi</TableCell>
            <TableCell>Kontaktinfo</TableCell>
            <TableCell>Pillirühm(ad)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.players.map(p => {
            return (
              <TableRow key={p.id}>
                <TableCell component='th' scope='row'>{p.nimi}</TableCell>
                <TableCell>{p.kasutaja.kasutajanimi}</TableCell>
                <TableCell>{p.kontaktinfo}</TableCell>
                <TableCell>{p.pillirühmad.map(pr => (
                  <Chip label={pr.nimi} className='instrumentChip'/>
                ))}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}
