import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { ArrowDownward } from '@material-ui/icons';
import { AppContext } from '../Common';
import { BackendService } from '../services';
import { ScoreView, Canvas } from '../components';

export default class Piece extends Component {

  constructor(props) {
    super(props);

    this.state = {
      scores: []
    }

    if (props.score) {
      BackendService.getPartiid(props.score.id)
        .then(response => this.setState({ scores: response.data }));
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {({ selectedScore, mouse }) => (
          <div>
            <Canvas className='pieceView' mouse={mouse}>
              {!selectedScore
                ? (<span>Vali kõigepealt mõni lugu</span>)
                : this.state.scores.map(partii =>
                  (<ScoreView
                    key={partii.id}
                    piece={selectedScore}
                    score={partii} />)
                )}
            </Canvas>
            <div className='buttonBar'>
              <Button variant="fab" color="primary">
                <ArrowDownward />
              </Button>
            </div>
          </div>)}
      </AppContext.Consumer>
    );
  }
}
