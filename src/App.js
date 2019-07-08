import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MovieList from './MovieList';
import MovieEdit from './MovieEdit';
import ActorList from './ActorList';
import ActorEdit from './ActorEdit';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/movies' exact={true} component={MovieList}/>
          <Route path='/movies/:id' exact={true} component={MovieEdit}/>
          <Route path='/movies/:id/actors' exact={true} component={ActorList}/>
          <Route path='/movies/:movieId/actors/:id' component={ActorEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
