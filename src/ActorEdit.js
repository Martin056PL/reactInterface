import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class ActorList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      actors: [],
    };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch(`http://localhost:8080/rest/movies/${this.props.match.params.id}/actors`)
      .then(response => response.json())
      .then(data => this.setState({actors: data, isLoading: false}));
  }
/*   movies/{movieId}/actors/{actorId} */
  async remove(id) {
    await fetch(`http://localhost:8080/rest/movies/${this.props.match.params.id}/actors/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedActors = [...this.state.actors].filter(i => i.actorId !== id);
      this.setState({actors: updatedActors});
    });
  }

  render() {
    const {actors, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const actorList = actors.map(actor => {
        return( 
        <tr key={actor.actorId}>
          <td style={{whiteSpace: 'nowrap'}}>{actor.firstName}</td>
          <td>{actor.lastName}</td>
          <td>{actor.age}</td>
          <td>
            <ButtonGroup>
              <Button size="sm" color="primary" tag={Link} to={ "/movies/" + this.props.match.params.id + "/actors/" + actor.actorId}>Edit</Button>
              <Button size="sm" color="danger" onClick={() => this.remove(actor.actorId)}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
      )});

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to={"/movies/" + this.props.match.params.id + "/actors/new"}>Add actor</Button>
          </div>
          <h3>My actors:</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">First Name</th>
              <th width="20%">Last Name</th>
              <th width="20%">Age</th>
              <th width="10%">Actor Options</th>
            </tr>
            </thead>
            <tbody>
            {actorList}
            </tbody>
          </Table>
          <div className="float-left">
          <Button color="secondary" tag={Link} to={"/movies"}>Back to movie list</Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default ActorList;