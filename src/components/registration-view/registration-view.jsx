import React, { useState } from 'react';
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';

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
        <Col justify-content-md-center>
          <CardGroup >
            <Card className='reg-card'>
              <Card.Body>
                <Card.Title className='reg-title'>Please Register</Card.Title>
                <Form>
                  <Form.Group>
                  <Form.Label className='reg-label'>Username:</Form.Label>
                    <Form.Control
                    className='reg-input' 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                    required >
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                  <Form.Label className='reg-label'>Password:</Form.Label>
                  <Form.Control 
                    className='reg-input'
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    required >
                  </Form.Control>
                  </Form.Group>

                  <Form.Group>
                  <Form.Label className='reg-label'>Email:</Form.Label>
                  <Form.Control
                    className='reg-input' 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required >
                  </Form.Control>
                  </Form.Group>

                  <Form.Group>
                  <Form.Label className='reg-label'>Date of Birth:</Form.Label>
                  <Form.Control
                    className='reg-input' 
                    type="date" 
                    value={birthday} 
                    onChange={e => setBirthday(e.target.value)}
                    required >
                  </Form.Control>
                  </Form.Group>

                  <Button className='reg-btn' variant='primary' type="submit" onClick={handleSubmit}>Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}