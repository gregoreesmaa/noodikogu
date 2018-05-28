import React, {Component} from 'react';
import {AppContext} from '../Common';
import {BackendService} from '../services';
import {ScoreView} from '../components';

export default class Piece extends Component {

  constructor(props) {
    super(props);

    this.state = {
      scores: []
    };

    if (props.score) {
      BackendService.getPartiid(props.score.id)
        .then(response => this.setState({scores: response.data}));
    }
  }

  render() {
    return (
      <div className='pieceView'>
        <AppContext.Consumer>
          {({selectedScore}) => !selectedScore
            ? (<span>Vali kõigepealt mõni lugu</span>)
            : this.state.scores.map(partii =>
              (<ScoreView key={partii.id} piece={selectedScore} score={partii}/>)
            )
          }
        </AppContext.Consumer>
      </div>
    );
  }
}
