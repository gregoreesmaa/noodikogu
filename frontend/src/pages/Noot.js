import React, {Component} from 'react';
import {AppContext} from '../Context';

export default class Noot extends Component {

  render() {
    return (
      <div className='scoreView'>
        <AppContext.Consumer>
          {({selectedScore}) => !selectedScore
            ? (<span>Vali kõigepealt mõni lugu</span>)
            : (<img src={selectedScore} alt='noot'/>)
          }
        </AppContext.Consumer>
      </div>
    );
  }
}
