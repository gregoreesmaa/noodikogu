import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import RepertuaarItem from '../components/RepertuaarItem';
import PartituurItem from '../components/PartituurItem';
import BackendService from '../services/BackendService';

export default class Noodikogu extends Component {

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
      <div>
        <TextField
          className='search'
          id="search"
          label="Otsi kõigest"
          type="search"
          margin="normal"
          onChange={this.search}
        />
        <List component="nav">
          {this.state.search
            ? this.state.search.map((item, index) => item.type === 'partituur'
              ? (<PartituurItem key={index} obj={item}/>)
              : (<RepertuaarItem key={index} obj={item}/>))
            : this.state.repertuaarid.map((item, index) =>
              (<RepertuaarItem key={index} obj={item}/>))}
        </List>
      </div>);
  }
}
