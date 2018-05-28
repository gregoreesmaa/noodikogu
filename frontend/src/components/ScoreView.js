import React, {Component} from 'react';
import Constants from '../Constants';

export default class ScoreView extends Component {

  render() {
    return (
      <div className='scoreView'>
        <img src={Constants.SERVER_URL + '/api/partii/' + this.props.score.id} alt='...'/>
      </div>
    );
  }
}
