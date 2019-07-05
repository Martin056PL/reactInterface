import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class ActorEdit extends Component {

    emptyActor = {
        id: '',
        firstName: '',
        lastName: '',
        age: ''
    };

    constructor(props) {
        super(props);
        this.state = {
          actor: this.emptyActor
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
          const actor = await (await fetch(`http://localhost:8080/rest/get-actor-by-id/${this.props.match.params.id}`)).json();
          this.setState({actor: actor});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const id = target.id;
        let actor = {...this.state.actor};
        actor[id] = value;
        this.setState({actor});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {actor} = this.state;
    
        if(actor.id) {
            await fetch(`http://localhost:8080/rest/get-actor-by-id/${this.props.match.params.id}`, {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(actor),
            });
        } else {
            await fetch('http://localhost:8080/api/directors/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(actor),
            });
        }
        
        this.props.history.push('/actor');
      }

    render() {
        const {actor} = this.state;
        const title = <h2>{actor.actorId ? 'Edit actor' : 'Add actor'}</h2>;

        return  <div>
                    <Container>
                        {title}
                        <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="firstName">First name</Label>
                            <Input type="text" name="firstName" id="firstName" value={actor.firstName || ''}
                                onChange={this.handleChange} autoComplete="firstName" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last name</Label>
                            <Input type="text" name="lastName" id="lastName" value={actor.lastName || ''}
                                onChange={this.handleChange} autoComplete="lastName" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="age">Age</Label>
                            <Input type="text" name="age" id="age" value={actor.age || ''}
                                onChange={this.handleChange} autoComplete="age" required/>
                        </FormGroup>
                        
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/actors">Cancel</Button>
                        </FormGroup>
                        </Form>
                    </Container>
                </div>
    }
}

export default withRouter(ActorEdit);
