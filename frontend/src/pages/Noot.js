import React, {Component} from 'react';
import {Score} from '../Context';

export default class Noot extends Component {

  render() {
    return (
      <div className='scoreView'>
        <Score.Consumer>
          {({filename}) => !filename
            ? (<span>Vali kõigepealt mõni lugu</span>)
            : (<img src={filename} alt='noot'/>)
          }
        </Score.Consumer>
      </div>
    );
  }
}
