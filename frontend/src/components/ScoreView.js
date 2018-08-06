import React from 'react';
import Constants from '../Constants';

export default ({ score }) => (
  <div className='scoreView'>
    <img src={Constants.SERVER_URL + '/api/partii/' + score.id} alt='...' />
  </div>
);
