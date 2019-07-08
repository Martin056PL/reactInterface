/* import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
 */
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
          <Route path='/movies/:id/actors/:id' exact={true} component={ActorEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;


  /* state = {
    isLoading: true,
    movies: []
  };

  async componentDidMount() {
    const response = await fetch('http://localhost:8080/rest/get-all-movies');
    const body = await response.json();
    this.setState({ movies: body, isLoading: false });
  }

  render() {
    const {movies, isLoading} = this.state;

      if (isLoading) {
      return <p>Loading...</p>;
    }  

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>Movies List</h2>
            {movies.map( movie =>
              <div key={movie.movieId}>
                {movie.title}
              </div>
            )}
          </div>
        </header>
      </div>
    );
  } */
