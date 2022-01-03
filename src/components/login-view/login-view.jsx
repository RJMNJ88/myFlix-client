import React, { useState } from 'react';
import { Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <CardGroup>
            <Card className='log-card'>
              <Card.Body>
                <Card.Title className='log-title'>Login</Card.Title>
                  <Form className='log-form'>
                    <Form.Group controlId='formUsername'>
                      <Form.Label className='log-label'>Username:</Form.Label>
                      <Form.Control className='log-input' type='text' onChange={e => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId='formPassword'>
                    <Form.Label  className='log-label'>Password:</Form.Label>
                    <Form.Control className='log-input' type='password' onChange={e => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button className='log-btn' variant='primary' type='submit' onClick={handleSubmit}>
                      Submit
                    </Button>

                  </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
    
  );
}