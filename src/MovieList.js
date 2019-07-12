import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';

class MovieList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      movies: [],
      activePage:1,
      itemsCountPerPage:'',
      totalItemsCount:''

    };
    this.remove = this.remove.bind(this);
    this.fetchURL = this.fetchURL.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this) 
  }

  componentDidMount() {
    this.setState({isLoading: true});

    this.fetchURL(this.state.activePage)
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

  handlePageChange(pageNumber) {
		console.log(`active page is ${pageNumber}`);
		this.setState({activePage: pageNumber});
		this.fetchURL(pageNumber, this.state.searchingName);
	}

  fetchURL(page) {
		this.setState({isLoading: true})
			fetch(`http://localhost:8080/rest/movies?page=${page}&size=10`)
				.then(response => response.json())
				.then(data => this.setState({
					movies: data.content,

					totalPages: data.totalPages,
					itemsCountPerPage: data.size,
					totalItemsCount: data.totalElements
				}))
		this.setState({isLoading: false})
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
          <td>
          <ButtonGroup>
          <Button size="sm" color="warning" tag={Link} to={"/movies/" + movie.movieId + "/actors"}>Actors</Button>
          </ButtonGroup>
          </td>
          <td>
              <Button size="sm" color="primary" tag={Link} to={"/movies/" + movie.movieId}>Edit</Button>
              &nbsp;
              <Button size="sm" color="danger" onClick={() => this.remove(movie.movieId)}>Delete</Button>
          </td> 
        </tr>  
      )});

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button color="secondary" tag={Link} to={"/"} >Back to main menu</Button>
          &nbsp;&nbsp;&nbsp;
            <Button color="success" tag={Link} to="/movies/new">New movie</Button>
          </div>
          <h3>My movies:</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="30%">Title</th>
              <th width="10%">Type</th>
              <th width="10%">Date Premiere</th>
              <th width="7%">Actors</th>
              <th width="10%">Movie Options</th>
            </tr>
            </thead>
            <tbody>
            {movieList}
            </tbody>
          </Table>
          <div className="float-left">
          <Pagination
							activePage={this.state.activePage}
							itemsCountPerPage={this.state.itemsCountPerPage}
							totalItemsCount={this.state.totalItemsCount}
							pageRangeDisplayed={5}
							itemClass='page-item'
							linkClass='btn btn-light'
							onChange={this.handlePageChange}
							firstPageText="First page"
							lastPageText="Last page"
							prevPageText="Previous page"
							nextPageText="Next page"
						/>
            </div>
        </Container>
      </div>
    );
  }
}

export default MovieList;