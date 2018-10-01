import React from 'react';
import Constants from '../../Constants';
import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar/GridListTileBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default ({score}) => (
  <GridListTile key={score.id} className="scoreHeaderView">

    <img src={Constants.SERVER_URL + '/api/partii/' + score.id} alt='...'/>
    <GridListTileBar
      className="scoreHeaderInfo"
      title={"test"}
      titlePosition="top"
      actionIcon={
        <IconButton>
          <AddCircleIcon/>
        </IconButton>
      }
    />
  </GridListTile>
);
