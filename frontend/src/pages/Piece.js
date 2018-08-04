import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { ArrowDownward } from '@material-ui/icons';
import { AppContext } from '../Common';
import { BackendService } from '../services';
import { ScoreView } from '../components';
import Hammer from 'react-hammerjs';

export default class Piece extends Component {

  transformation = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    cdiffx: 0,
    cdiffy: 0,
    scale: 1
  }
  lastTransformation = JSON.parse(JSON.stringify(this.transformation));

  constructor(props) {
    super(props);

    this.state = {
      scores: [],
      transformation: this.transformation,
      lastTransformation: this.lastTransformation
    };

    this.transformers = {
      outer: React.createRef(),
      middle: React.createRef(),
      inner: React.createRef()
    }

    if (props.score) {
      BackendService.getPartiid(props.score.id)
        .then(response => this.setState({ scores: response.data }));
    }
  }

  hasTriedMoreComplexGesture(event) {
    switch (event.type) {
      case 'pan':
      case 'panstart':
      case 'panend':
        return event.maxPointers > 1;
      case 'pinch':
      case 'pinchstart':
      case 'pinchend':
        return event.maxPointers > 2;
      default:
        return true;
    }
  }


  animationOngoing = false;
  prev = 0

  onTap(event) {
    //console.log("OnTap", event);
    this.animationOngoing = false;
  }

  onMoveStart(event) {
    //console.log("OnMoveStart", event);
    this.animationOngoing = false;
    this.saveLastTransformationState();
    if (this.hasTriedMoreComplexGesture(event)) return;
    let scale = this.transformation.scale;
    this.transformation.cdiffx += (1 - 1 / scale) * (event.center.x - this.transformation.x);
    this.transformation.cdiffy += (1 - 1 / scale) * (event.center.y - this.transformation.y);
    this.transformation.x = event.center.x;
    this.transformation.y = event.center.y;

    this.saveTransformationState();
  }

  onMove(event) {
    //console.log("OnMove", event);
    if (this.hasTriedMoreComplexGesture(event)) return;
    this.transformation.scale = event.scale * this.lastTransformation.scale;
    this.transformation.dx += event.center.x - this.transformation.x;
    this.transformation.dy += event.center.y - this.transformation.y;
    this.transformation.x = event.center.x;
    this.transformation.y = event.center.y;

    //console.log(this.transformation, transformation)
    this.saveTransformationState();
  }

  onMoveEnd(event) {
    //console.log("OnMoveEnd", event);
    if (this.hasTriedMoreComplexGesture(event)) return;

    this.animationOngoing = true;
    //if (this.transformation.scale >= 1.2)
    this.prev = 0;
    this.onMoveInertia(event);
  }

  onMoveInertia(event) {
    let curr = Date.now();
    if (this.prev === 0) {
      this.prev = curr;
    }
    let delta = curr - this.prev;
    this.prev = curr;

    //console.log("OnMoveInertia", event);
    let inertia = false;
    if (this.animationOngoing) {
      if (Math.abs(event.velocityX) >= 0.01) {
        event.velocityX *= 0.96;
        event.center.x += event.velocityX * delta;
        inertia = true;
      }
      if (Math.abs(event.velocityY) >= 0.01) {
        event.velocityY *= 0.96;
        event.center.y += event.velocityY * delta;
        inertia = true;
      }
    }
    if (inertia) {
      this.onMove(event);
      setTimeout(() => this.onMoveInertia(event), 5);
    } else {
      this.animationOngoing = false;
    }
  }

  saveLastTransformationState() {
    this.lastTransformation = JSON.parse(JSON.stringify(this.transformation))
  }

  saveTransformationState() {
    if (this.transformers.outer.current) {
      this.transformers.outer.current.style.transform = `translate(${this.state.transformation.dx}px, ${this.state.transformation.dy}px)`;
      this.transformers.middle.current.style.transform = `scale(${this.state.transformation.scale})`;
      this.transformers.middle.current.style.transformOrigin = `${this.state.transformation.x - this.state.transformation.dx}px ${this.state.transformation.y - this.state.transformation.dy}px`;
      this.transformers.inner.current.style.transform = `translate(${this.state.transformation.cdiffx}px, ${this.state.transformation.cdiffy}px`;
    }
    //this.setState({ transformation: this.transformation });
  }

  render() {
    return (
      <div>
        <Hammer
          onTap={(event) => this.onTap(event)}
          onPanStart={(event) => this.onMoveStart(event)}
          onPan={(event) => this.onMove(event)}
          onPanEnd={(event) => this.onMoveEnd(event)}
          onPinchStart={(event) => this.onMoveStart(event)}
          onPinch={(event) => this.onMove(event)}
          onPinchEnd={(event) => this.onMoveEnd(event)}
          options={{
            recognizers: {
              pan: { threshold: 0 },
              pinch: { enable: true }
            }
          }}>

          <div>
            <div className='transformer transformer__outer' ref={this.transformers.outer}>
              <div className='transformer transformer__middle' ref={this.transformers.middle}>
                <div className='transformer transformer__inner pieceView' ref={this.transformers.inner}>
                  <AppContext.Consumer>
                    {({ selectedScore }) => !selectedScore
                      ? (<span>Vali kõigepealt mõni lugu</span>)
                      : this.state.scores.map(partii =>
                        (<ScoreView
                          key={partii.id}
                          piece={selectedScore}
                          score={partii} />)
                      )
                    }
                  </AppContext.Consumer>
                </div>
              </div>
            </div>
          </div>
        </Hammer>
        <div className='buttonBar'>
          <Button variant="fab" color="primary">
            <ArrowDownward />
          </Button>
        </div>
      </div>
    );
  }
}
