import React, {Component} from 'react';
import {List, TextField} from '@material-ui/core';
import {BackendService} from '../services';
import {PieceItem, PlaylistItem} from '../components';

export default class Library extends Component {

  constructor() {
    super();
    this.state = {
      repertuaarid: [],
      search: null
    };
    BackendService.getRepertuaarid()
      .then(response => this.setState({repertuaarid: response.data}));
  }

  search = event => {
    let searchText = event.target.value;
    if (searchText && searchText.length >= 2) {
      if (!this.state.search) {
        this.setState({
          search: []
        });
      }
      BackendService.search(searchText)
        .then(response => {
          let {partituurid, repertuaarid} = response.data;
          partituurid.forEach(partituur => partituur.type = 'partituur');
          repertuaarid.forEach(repertuaar => repertuaar.type = 'repertuaar');
          this.setState({
            search: partituurid.concat(repertuaarid).sort((a, b) => a.nimi < b.nimi ? -1 : (a.nimi > b.nimi ? 1 : 0))
          });
        });
    } else if (searchText.length === 0) {
      this.setState({
        search: null
      });
    }
  };

  render() {
    return (
      <div className='container'>
        <TextField
          className='search'
          id='search'
          label='Otsi kõigest'
          type='search'
          margin='normal'
          onChange={this.search}
        />
        <List component='nav'>
          {this.state.search
            ? this.state.search.map((item, index) => item.type === 'partituur'
              ? (<PieceItem key={index} obj={item}/>)
              : (<PlaylistItem key={index} obj={item}/>))
            : this.state.repertuaarid.map((item, index) =>
              (<PlaylistItem key={index} obj={item}/>))}
        </List>
      </div>);
  }
}
