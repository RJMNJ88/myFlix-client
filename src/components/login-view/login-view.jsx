import React, { useState } from 'react';
import { Button, Form, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';


import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  //Hooks for validation
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  //Validate user inputs
  const validate = () => {
    let isReq = true;
    if(!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if(username.length < 2) {
      setUsernameErr('Username must be at least 2 characters.');
      isReq = false;
    }
    if(!password) {
      setPasswordErr('Password Required');
      isReq = false;
    }else if(password.length < 6) {
      setPasswordErr('Password must be at least 6 characters.');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://blooming-wildwood-80599.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('User could not be found.')
      });
    }  
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
                      {usernameErr && <p>{usernameErr}</p>}
                    </Form.Group>

                    <Form.Group controlId='formPassword'>
                      <Form.Label  className='log-label'>Password:</Form.Label>
                      <Form.Control className='log-input' type='password' onChange={e => setPassword(e.target.value)} />
                      {passwordErr && <p>{passwordErr}</p>}
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