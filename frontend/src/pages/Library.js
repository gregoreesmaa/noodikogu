import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import { BackendService } from '../services';
import { PieceItem, PlaylistItem } from '../components';
import { playlistsLoaded, changeFilterCriteria, filteredListChanged } from '../state/';

class Library extends Component {
  constructor(props) {
    super(props);

    this.componentDidUpdate({});
  }

  render() {
    console.log("filteredList", this.props.filteredList);
    return (<div className='container'>
      <TextField
        className='search'
        id='search'
        label='Otsi kõigest'
        type='search'
        margin='normal'
        value={this.props.filter}
        onChange={event => this.props.changeFilterCriteria(event.target.value)}
      />
      <List component='nav'>
        {this.props.filteredList
          ? this.props.filteredList.map((item, index) =>
            item.type === 'partituur'
              ? (<PieceItem key={index} piece={item} />)
              : (<PlaylistItem key={index} playlist={item} />))
          : this.props.playlists.map((item, index) =>
            (<PlaylistItem key={index} playlist={item} />))
        }
      </List>
    </div>);
  }

  componentDidUpdate(prevProps) {
    console.log("ComponentDidUpdate");
    if (this.props.user !== prevProps.user) {
      BackendService.getRepertuaarid()
        .then(response => this.props.playlistsLoaded(response.data));
    }
    if (this.props.filter !== prevProps.filter) {
      if (this.props.filter && this.props.filter.length >= 2) {
        BackendService.search(this.props.filter)
          .then(response => {
            let { partituurid, repertuaarid } = response.data;
            partituurid.forEach(partituur => partituur.type = 'partituur');
            repertuaarid.forEach(repertuaar => repertuaar.type = 'repertuaar');

            let results = partituurid
              .concat(repertuaarid)
              .sort((a, b) => a.nimi < b.nimi ? -1 : (a.nimi > b.nimi ? 1 : 0));

            this.props.filteredListChanged(results);
          });
      } else {
        this.props.filteredListChanged(null);
      }
    }
  }
}

const mapStateToProps = ({ user, filter, filteredList, playlists }) => ({ user, filter, filteredList, playlists });
const mapDispatchToProps = dispatch => bindActionCreators({ playlistsLoaded, changeFilterCriteria, filteredListChanged }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Library);
