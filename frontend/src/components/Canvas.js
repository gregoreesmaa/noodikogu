import React, { Component } from 'react';
import Hammer from 'react-hammerjs';

export default class Canvas extends Component {

  transformers = {
    outer: React.createRef(),
    middle: React.createRef(),
    inner: React.createRef()
  };

  transformation = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    cdiffx: 0,
    cdiffy: 0,
    scale: 1
  };
  lastTransformation = {};

  animationOngoing = false;
  prevTime = 0;

  constructor() {
    super();
    this.saveLastTransformationState();
  }

  ignoreEvent(event) {
    return event.pointerType === 'mouse';
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

  onTap(event) {
    if (this.ignoreEvent(event)) return;

    this.animationOngoing = false;
  }

  onMoveStart(event) {
    this.animationOngoing = false;
    this.saveLastTransformationState();
    if (this.ignoreEvent(event) || this.hasTriedMoreComplexGesture(event)) return;

    let scale = this.transformation.scale;
    this.transformation.cdiffx += (1 - 1 / scale) * (event.center.x - this.transformation.x);
    this.transformation.cdiffy += (1 - 1 / scale) * (event.center.y - this.transformation.y);
    this.transformation.x = event.center.x;
    this.transformation.y = event.center.y;

    this.applyTransformation();
  }

  onMove(event) {
    if (this.ignoreEvent(event) || this.hasTriedMoreComplexGesture(event)) return;

    this.transformation.scale = event.scale * this.lastTransformation.scale;
    this.transformation.dx += event.center.x - this.transformation.x;
    this.transformation.dy += event.center.y - this.transformation.y;
    this.transformation.x = event.center.x;
    this.transformation.y = event.center.y;

    this.applyTransformation();
  }

  onMoveEnd(event) {
    if (this.ignoreEvent(event) || this.hasTriedMoreComplexGesture(event)) return;

    this.animationOngoing = true;
    this.prevTime = 0;
    this.onMoveInertia(event);
  }

  onMoveInertia(event) {
    let currTime = Date.now();
    if (this.prevTime === 0)
      this.prevTime = currTime;
    let delta = currTime - this.prevTime;
    this.prevTime = currTime;

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
    Object.assign(this.lastTransformation, this.transformation);
  }

  applyTransformation() {
    const t = this.transformation;
    const { inner, outer, middle } = this.transformers;

    if (outer.current) {
      outer.current.style.transform = `translate(${t.dx}px, ${t.dy}px)`;
      middle.current.style.transform = `scale(${t.scale})`;
      middle.current.style.transformOrigin = `${t.x - t.dx}px ${t.y - t.dy}px`;
      inner.current.style.transform = `translate(${t.cdiffx}px, ${t.cdiffy}px`;
    }
  }

  addNoScrollRestraint() {
    document.body.classList.add('noscroll');
    document.documentElement.classList.add('noscroll');
  }

  removeNoScrollRestraint() {
    document.body.classList.remove('noscroll');
    document.documentElement.classList.remove('noscroll');
  }

  componentWillMount() {
    if (this.props.touch) {
      this.addNoScrollRestraint();
    }
  }

  componentWillUnmount() {
    this.removeNoScrollRestraint();
  }

  render() {
    return (
      <Hammer
        onTap={(e) => this.onTap(e)}
        onPanStart={(e) => this.onMoveStart(e)}
        onPan={(e) => this.onMove(e)}
        onPanEnd={(e) => this.onMoveEnd(e)}
        onPinchStart={(e) => this.onMoveStart(e)}
        onPinch={(e) => this.onMove(e)}
        onPinchEnd={(e) => this.onMoveEnd(e)}
        options={{
          recognizers: {
            pan: { threshold: 0 },
            pinch: { enable: true }
          }
        }}>
        <div>
          <div className='transformer transformer__outer' ref={this.transformers.outer}>
            <div className='transformer transformer__middle' ref={this.transformers.middle}>
              <div className='transformer transformer__inner' ref={this.transformers.inner}>
                <div className={this.props.className}>
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Hammer>
    )
  }
}
