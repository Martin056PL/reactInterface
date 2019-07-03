import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class movieList extends Component {

  constructor(props) {
    super(props);
    this.state = {movies: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('http://localhost:8080/rest/get-all-movies')
      .then(response => response.json())
      .then(data => this.setState({movies: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`http://localhost:8080/rest/delete-movie-by-id/${id}`, {
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
        return <tr key={movie.movieId}>
        <td style={{whiteSpace: 'nowrap'}}>{movie.title}</td>
        <td>{movie.type}</td>
        <td>{movie.datePremiere}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/movies/" + movie.movieId}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(movie.movieId)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/movies/new">Add movie</Button>
          </div>
          <h3>My JUG Tour</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Title</th>
              <th width="20%">Type</th>
              <th>Events</th>
              <th width="10%">Date Premiere</th>
            </tr>
            </thead>
            <tbody>
            {movieList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default movieList;