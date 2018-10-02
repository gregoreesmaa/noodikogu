import React, {Component} from "react";
import TextField from "@material-ui/core/TextField/TextField";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import {AdminService} from "../../services";

class AdminPiecesCreate extends Component {

  handleFieldChange = (fieldName) => (event) => Object.assign(this.fields, {[fieldName]: event.target.value});
  handleFileChange = (fieldName) => (event) => Object.assign(this.fields, {[fieldName]: event.target.files[0]});

  fields = {};

  saveFile() {
    const formData = new FormData();
    formData.append('name', this.fields.name);
    formData.append('file', this.fields.file);
    AdminService.addPartituur(formData)
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
        <input
          type="file"
          id="raised-button-file"
          onChange={this.handleFileChange('file')}
        />
        <Button
          variant="raised"
          onClick={() => this.saveFile()}
        >
          Loo uus lugu
        </Button>
      </div>
    )
  }
}

const pieceStateToProps = ({saveFile}) => ({saveFile});
const pieceDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(pieceStateToProps, pieceDispatchToProps)(AdminPiecesCreate);
