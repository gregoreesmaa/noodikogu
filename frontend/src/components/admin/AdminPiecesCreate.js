import React, {Component} from "react";
import TextField from "@material-ui/core/TextField/TextField";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import {AdminService} from "../../services";
import CircularProgress
  from "@material-ui/core/CircularProgress/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

class AdminPiecesCreate extends Component {

  handleFieldChange = (fieldName) => (event) => Object.assign(this.fields, {[fieldName]: event.target.value});
  handleFileChange = (fieldName) => (event) => Object.assign(this.fields, {[fieldName]: event.target.files[0]});

  fields = {};
  state = {};

  saveFile() {
    const formData = new FormData();
    formData.append('name', this.fields.name);
    formData.append('file', this.fields.file);

    this.setState({loading: true});
    AdminService.addPartituur(formData)
      .then(() => {
        this.setState({loading: false});
      })
      .catch(error => {
        this.setState({loading: false, error});
      });
  }

  render() {
    return <div className='newPieceForm'>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.error}
        autoHideDuration={6000}
        onClose={() => this.setState({error: null})}
        message={<span>Partituuri lisamine ebaõnnestus.</span>}
      />
      {
        this.state.loading
          ? <CircularProgress/>
          : <form>
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
          </form>
      }
    </div>;
  }
}

const pieceStateToProps = ({saveFile}) => ({saveFile});
const pieceDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(pieceStateToProps, pieceDispatchToProps)(AdminPiecesCreate);
