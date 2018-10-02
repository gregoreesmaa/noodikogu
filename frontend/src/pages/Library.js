import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import {BackendService} from '../services';
import {PieceItem, PlaylistItem} from '../components';
import {playlistsLoaded, changeFilterCriteria, filteredListChanged, setStatistics} from '../state/';

class Library extends Component {
  constructor(props) {
    super(props);
    BackendService.getStatistics()
      .then(response => this.props.setStatistics(response.data));
    this.componentDidUpdate({});
  }

  renderStatistics() {
    if (!this.props.statistics) {
      return (
        <div>Statistikat laetakse...</div>
      )
    }
    let mostPopularBrowser;
    let browserPopularity = 0;
    for(let key in this.props.statistics.browserPopularity){
      let tempPopularity = this.props.statistics.browserPopularity[key];
      if (tempPopularity > browserPopularity){
        browserPopularity = tempPopularity;
        mostPopularBrowser = key;
      }
    }

    let mostPopularOpSystem;
    let opSystemPopularity = 0;
    for(let key in this.props.statistics.opSystemPopularity){
      let tempPopularity = this.props.statistics.opSystemPopularity[key];
      if (tempPopularity > opSystemPopularity){
        opSystemPopularity = tempPopularity;
        mostPopularOpSystem = key;
      }
    }

    let mostPopularTime;
    let timePopularity = 0;
    for(let key in this.props.statistics.timePopularity){
      let tempPopularity = this.props.statistics.timePopularity[key];
      if (tempPopularity > timePopularity){
        timePopularity = tempPopularity;
        mostPopularTime = key;
      }
    }

    return (
      <div>
        <h4>Külastajate statistika</h4>
        {mostPopularBrowser} on selle lehe külastajate seas populaarseim brauser ning seda on kasutatud {browserPopularity} korda.
        <br />
        {mostPopularOpSystem} on selle lehe külastajate seas populaarseim operatsioonisüsteem ning seda on kasutatud {opSystemPopularity} korda.
        <br />
        {mostPopularTime}:00-{Number(mostPopularTime)+1}:00 on selle lehe külastajate seas populaarseim külastusaeg ning sellel ajal külastajaid on {timePopularity}.
      </div>
    );
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
              ? (<PieceItem key={index} piece={item}/>)
              : (<PlaylistItem key={index} playlist={item}/>))
          : this.props.playlists.map((item, index) =>
            (<PlaylistItem key={index} playlist={item}/>))
        }
      </List>
      <div>{this.renderStatistics()}</div>
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
            let {partituurid, repertuaarid} = response.data;
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

const mapStateToProps = ({user, filter, filteredList, playlists, statistics}) => ({
  user,
  filter,
  filteredList,
  playlists,
  statistics
});
const mapDispatchToProps = dispatch => bindActionCreators({
  playlistsLoaded,
  changeFilterCriteria,
  filteredListChanged,
  setStatistics
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Library);
