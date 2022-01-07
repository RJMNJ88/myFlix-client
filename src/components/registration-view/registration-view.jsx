import React, { useState } from 'react';
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  //Hooks for validation
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');
  
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
    if(!email) {
      setEmailErr('Email Required');
      isReq = false;
    }else if(email.indexOf('@') === -1) {
      setEmailErr('Please enter a valid email.');
      isReq = false;
    }  
    return isReq;
  }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(username, password, email, birthday);
  //   /* Send a request to the server for authentication */
  //   /* then call props.onLoggedIn(username) */
  //   props.onRegistered(username);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    const isReq = validate();
    if(isReq) {
      axios.post('https://blooming-wildwood-80599.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        // props.onRegistered(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('Could not register user.')
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
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
                    {usernameErr && <p>{usernameErr}</p>}
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
                    {passwordErr && <p>{passwordErr}</p>}
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
                    {emailErr && <p>{emailErr}</p>}
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