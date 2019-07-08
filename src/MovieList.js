import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class MovieList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      movies: []
    };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('http://localhost:8080/rest/movies')
      .then(response => response.json())
      .then(data => this.setState({movies: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`http://localhost:8080/rest/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedmovies = [...this.state.movies].filter(i => i.movieId !== id);
      this.setState({movies: updatedmovies});
    });
  }

  render() {
    const {movies, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const movieList = movies.map(movie => {
        return( 
        <tr key={movie.movieId}>
          <td style={{whiteSpace: 'nowrap'}}>{movie.title}</td>
          <td>{movie.type}</td>
          <td>{movie.datePremiere}</td>
          <ButtonGroup>
          <Button size="sm" color="warning" tag={Link} to={"/movies/" + movie.movieId + "/actors"}>Actors</Button>
          </ButtonGroup>
          <td>
            <ButtonGroup>
              <Button size="sm" color="primary" tag={Link} to={"/movies/" + movie.movieId}>Edit</Button>
              <Button size="sm" color="danger" onClick={() => this.remove(movie.movieId)}>Delete</Button>
            </ButtonGroup>
          </td> 
        </tr>  
      )});

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/movies/new">new movie</Button>
          </div>
          <h3>My movies:</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Title</th>
              <th width="20%">Type</th>
              <th width="20%">Date Premiere</th>
              <th width="10%">Actors</th>
              <th width="10%">Movie Options</th>
            </tr>
            </thead>
            <tbody>
            {movieList}
            </tbody>
          </Table> 
          <div className="float-left">
          <Button color="secondary" tag={Link} to={"/"}>Back to main menu</Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default MovieList;