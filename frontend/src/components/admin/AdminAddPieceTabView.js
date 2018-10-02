import React, {Component} from "react";
import TextField from "@material-ui/core/TextField/TextField";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import {AdminService} from "../../services";

class AdminAddPieceTabView extends Component {

  handleFieldChange = (fieldName) => (event) => Object.assign(this.fields, {[fieldName]: event.target.value});
  fields = {};

  saveFile(multiPathFile, name) {
    AdminService.addPartituur(multiPathFile, name)
  }

  render() {
    return (
      <div className='newPieceForm'>
        <TextField
          id='name'
          label='Nimi'
          margin='normal'
          onChange={this.handleFieldChange('name')}
        />
        <input type="file" id="raised-button-file"/>
        <Button variant="raised" onClick={(p) => this.saveFile(p, this.props.name)}>Loo uus lugu</Button>
      </div>
    )
  }
}

const pieceStateToProps = ({saveFile}) => ({saveFile});
const pieceDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(pieceStateToProps, pieceDispatchToProps)(AdminAddPieceTabView);
