import React, { useState } from 'react';
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegistered(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Register</Card.Title>
                <Form>
                  <Form.Group>
                  <Form.Label>Username:</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                    required >
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    required >
                  </Form.Control>
                  </Form.Group>

                  <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required >
                  </Form.Control>
                  </Form.Group>

                  <Form.Group>
                  <Form.Label>Date of Birth:</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={birthday} 
                    onChange={e => setBirthday(e.target.value)}
                    required >
                  </Form.Control>
                  </Form.Group>

                  <Button variant='primary' type="submit" onClick={handleSubmit}>Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}