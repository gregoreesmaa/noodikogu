import React, {Component} from 'react';
import './App.css';
import Menu from './components/Menu';
import {Route, Switch} from 'react-router-dom';
import Noodikogu from './pages/Noodikogu';
import Noot from './pages/Noot';


export default class App extends Component {

  render() {
    return (
      <div className='app'>
        <Menu/>
        <main>
          <Switch>
            <Route exact path='/' component={Noodikogu}/>
            <Route path='/noot' component={Noot}/>
          </Switch>
        </main>
      </div>
    );
  }
}
