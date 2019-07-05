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

    fetch(`http://localhost:8080/rest/get-movie-by-id/${this.props.match.params.id}/actors`)
      .then(response => response.json())
      .then(data => this.setState({actors: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`http://localhost:8080/rest/delete-actor-by-id/${id}`, {
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
            <Button color="success" tag={Link} to="/actor/new">Add movie</Button>
          </div>
          <h3>My movies:</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Title</th>
              <th width="20%">Type</th>
              <th width="20%">Date Premiere</th>
              <th width="10%">Options</th>
            </tr>
            </thead>
            <tbody>
            {actorList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ActorList;