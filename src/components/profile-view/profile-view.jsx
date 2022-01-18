import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Card, Row, Col, Form, Figure } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';

import './profile-view.css';

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
    }; 
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  getUser() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios.get(`https://blooming-wildwood-80599.herokuapp.com/Users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  editUser = (e) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.get(`https://blooming-wildwood-80599.herokuapp.com/Users/${username}`, {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday,
    },
    {headers: { Authorization: `Bearer ${token}` }})
    .then((response) => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday
      });

      localStorage.setItem('user', this.state.Username);
      const data = response.data;
      alert("Profile is updated!");
      window.open(`/users/${username}`, "_self");
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  removeFav(e, movies) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    // axios.delete(`https://blooming-wildwood-80599.herokuapp.com/Users/${username}/Movies/${movies._id}`, {
      axios.delete(`https://blooming-wildwood-80599.herokuapp.com/Users/${username}/Movies/:_id`, {

      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      console.log(response);
      this.componentDidMount();
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  removeUser() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.delete(`https://blooming-wildwood-80599.herokuapp.com/Users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      console.log(response);
      alert('Your profile has been removed.');
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.open(`/`, "_self");
    })
    .catch(function(error) {
      console.log(error);
    });

  }

  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }

  render() {
    const { movies, onBackClick, user} = this.props;
    const { Username, Email, Birthday, FavoriteMovies, Title, ImagePath } = this.state;

    return (
      <>
        <Container>
          <Row>
            <Col className='profile-col' >
              <Card className="profile">
                <Card.Body className='profile-container'>
                  <Card.Title className='profile-title'>myProfile</Card.Title>
                  <Card.Text className="username">
                    <span className="label">Username: </span>
                    <span className="value">{Username}</span>
                  </Card.Text>
                  <Card.Text className="email">
                    <span className="label">Email: </span>
                    <span className="value">{Email}</span>
                  </Card.Text>
                  <Card.Text className="birthday">
                    <span className="label">Birthday: </span>
                    <span className="value">{Birthday}</span>
                  </Card.Text>
                  <Card.Text className="image">
                    
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className='update-profile'>
                <Card.Body>
                  <Card.Title className='edit-profile-title'>Edit Profile</Card.Title>
                    <Form
                      className='update-form'
                      onSubmit={(e) => {
                        this.editUser(
                          e,
                          this.Username,
                          this.Password,
                          this.Email,
                          this.Birthday
                        )
                      }}>
                      <Form.Group>
                        <Form.Label className='user-label'>Username:</Form.Label>
                        <Form.Control
                          type='text'
                          name='Username'
                          placeholder='Edit Username'
                          onChange={(e) => this.setUsername(e.target.value)}
                          required
                        />
                      </Form.Group> 
                      <Form.Group>
                        <Form.Label className='pass-label'>Password:</Form.Label>
                        <Form.Control
                          type='password'
                          name='Password'
                          placeholder='Edit Password'
                          onChange={(e) => this.setPassword(e.target.value)}
                          required
                        />
                      </Form.Group> 
                      <Form.Group>
                        <Form.Label className='email-label'>Email:</Form.Label>
                        <Form.Control
                          type='email'
                          name='Email'
                          placeholder='Edit Email'
                          onChange={(e) => this.setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>    
                      <Form.Group>
                        <Form.Label className='birth-label'>Birthday:</Form.Label>
                        <Form.Control
                          type='date'
                          name='Birthday'
                          placeholder='Edit Birthday'
                          onChange={(e) => this.setBirthday(e.target.value)}
                        />
                      </Form.Group>  
                      <Form.Group className='edit-btns'>
                        <Button className='update-btn' type='submit' onClick={this.editUser}>Update Profile</Button>
                        <Button className='delete-btn' onClick={() => this.removeUser()}>Delete Profile</Button>
                      </Form.Group>
                    </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        
        <Container>
          {/* <Row className='justify-content-md-center'>
            <Col>
              myFavorites
            </Col>
          </Row> */}          
          <div className='fav-container'>
            <h3 className='fav-header'>myFavorites</h3>
          </div>
          <Row className='fav-row justify-content-md-center'>
                {FavoriteMovies.length === 0 && (<div className='no-favs'>No Favorites Selected...</div>)}
                {FavoriteMovies.length > 0 && movies.map((movie) => {
                  if(movie._id === FavoriteMovies.find((favorite) => favorite === movie._id)) {
                    return (    
                      // <Row className='justify-content-md-center'>
                      <Col className='fav-col'md={3} key={movie._id} movie={movie}> 
                        {/* <Figure>
                          <Link>
                          <Figure.Image
                            src={ImagePath}
                          />
                          <Figure.Caption>
                            {Title}
                          </Figure.Caption>
                          </Link>
                        </Figure> */}
                        {/* <Button >Remove</Button> */}
                       
                          <MovieCard key={movie._id} movie={movie}/>
                          <div className='remove-btn-container'>
                            <Button className='remove-btn' onClick={() => {this.removeFav(movie._id)}}>(x)Remove</Button>
                          </div>
                       
                      </Col>
                      // </Row>
                    )
                  }
                })}                     
          </Row>
        </Container>

        <div className="">
          <Button className='back-btn' onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
        
      </>
    )
  }


}
