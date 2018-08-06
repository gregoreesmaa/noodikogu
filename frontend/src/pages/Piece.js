import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { BackendService } from '../services';
import { ScoreView, Canvas } from '../components';
import { setPieceParts } from '../state';

class Piece extends Component {

  constructor(props) {
    super(props);

    this.componentDidUpdate({});
  }

  render() {
    return (
      <div>
        <Canvas className='pieceView' touch={this.props.touchscreen}>
          {!this.props.piece
            ? (<span>Vali kõigepealt mõni lugu</span>)
            : this.props.pieceParts.map(part =>
              (<ScoreView
                key={part.id}
                score={part} />) // TODO part = [sheet...]
            )}
        </Canvas>
        <div className='buttonBar'>
          <Button variant="fab" color="primary">
            <ArrowDownward />
          </Button>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.piece !== prevProps.piece || this.props.user !== prevProps.user) {
      if (this.props.piece) {
        BackendService.getPartiid(this.props.piece.id)
          .then(response => this.props.setPieceParts(response.data));
      } else {
        this.props.setPieceParts(null);
      }
    }
  }
}

const mapStateToProps = ({ touchscreen, user, piece, pieceParts }) => ({ touchscreen, user, piece, pieceParts });
const mapDispatchToProps = dispatch => bindActionCreators({ setPieceParts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Piece);
