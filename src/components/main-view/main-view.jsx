import React from 'react';
import axios from 'axios';
import {Col, Row, Container, Button} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavView } from '../navbar/navbar';
import {ProfileView} from '../profile-view/profile-view';



export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            user: null,
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://blooming-wildwood-80599.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          // Assign the result to the state
          this.setState({
            movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onRegistered(registered) {
        this.setState({
            registered
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });      
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
          user: null
        });
        window.open('/', '_self');
    }

    render() {
        const { movies, user } = this.state;

        // if (!registered) return <RegistrationView onRegistered={registered => this.onRegistered(registered)} />;
        // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        return (
          <Router>
            <NavView user={user}/>
            <Container>
              <Row className="main-view justify-content-md-center">
                <Route exact path='/' render={() => {
                  if(!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;
                  return movies.map(movie => (
                    <Col className='cards' xs={12} sm={6} md={4} lg={3}>
                        <MovieCard  key={movie._id} movie={movie} 
                        onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                    </Col>
                    ))
                }} />
                <Route path='/register' render={() => {
                  if(user) return <Redirect to='/' />
                  return <Col>
                    <RegistrationView />
                  </Col>
                }} />
                <Route path='/movies/:Title' render={({match, history}) => {
                  if(!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col xs={12} sm={12} md={8} lg={6}>
                      <MovieView movie={movies.find(m => m._id === match.params.Title)} onBackClick={() => history.goBack()} />                    
                      </Col>
                }} />
                <Route path="/directors/:Name" render={({ match, history }) => {
                  if(!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                  </Col>
                }} />
                <Route path="/genres/:Name" render={({ match, history }) => {
                  if(!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                    <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                  </Col>
                }} />
                <Route path={`/users/${user}`} render={({ match, history }) => {
                  if(!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                  </Col>
                  return <Col>
                    <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                  </Col>
                }} />
                <Route path={`/user-update/${user}`} render={({ match, history }) => {
                  if(!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                  </Col>
                  return <Col>
                    <UserUpdate user={user} onBackClick={() => history.goBack()} />
                  </Col>
                }} />
              </Row>
            </Container>
          </Router>
        );
    }
}