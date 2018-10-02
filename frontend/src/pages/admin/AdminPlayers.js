import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {AdminService} from '../../services';
import {playersLoaded} from '../../state';


class AdminPlayers extends Component {

  constructor(props) {
    super(props);

    this.componentDidUpdate({});
  }

  fields = {};
  handleFieldChange = (fieldName) => (event) => Object.assign(this.fields, {[fieldName]: event.target.value});

  render() {
    return this.props.players
      ? (
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
            {this.props.players.map(p => {
              return (
                <TableRow key={p.id}>
                  <TableCell component='th' scope='row'>{p.nimi}</TableCell>
                  <TableCell>{p.kasutaja ? p.kasutaja.kasutajanimi : '-'}</TableCell>
                  <TableCell>{p.kontaktinfo}</TableCell>
                  <TableCell>{p.pillirühmad.map(pr => (
                    <Chip key={pr.id} label={pr.nimi} className='labelChip'/>
                  ))}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell>
                <TextField
                  label='Uue pillimehe nimi'
                  onChange={this.handleFieldChange('newPlayerName')}
                  margin='normal'
                />
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                <TextField
                  label='Uue pillimehe kontaktinfo'
                  onChange={this.handleFieldChange('newPlayerInfo')}
                  margin='normal'
                />
              </TableCell>
              <TableCell>
                <Button type='submit' variant='raised' color='primary'
                        onClick={() => this.addPlayer()}
                >
                  Lisa uus pillimees
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )
      : (<div/>);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      AdminService.getPillimehed()
        .then(response => this.props.playersLoaded(response.data));
    }
  }

  addPlayer() {
    let {newPlayerName, newPlayerInfo} = this.fields;
    const params = new URLSearchParams();
    params.append('newPlayerName', newPlayerName);
    params.append('newPlayerInfo', newPlayerInfo);
    AdminService.addNewPlayer(params)
      .then(() =>
        AdminService.getPillimehed()
          .then(response => this.props.playersLoaded(response.data))
      );
  }
}

const mapStateToProps = ({players, user}) => ({players, user});
const mapDispatchToProps = dispatch => bindActionCreators({playersLoaded}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminPlayers);
