import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            registered: null
        };
    }

    // componentDidMount(){
    //     axios.get('https://blooming-wildwood-80599.herokuapp.com/movies')
    //         .then(response => {
    //             this.setState({
    //                 movies: response.data
    //             });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //     });
    // }

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

    render() {
        const { movies, selectedMovie, user, registered } = this.state;

        if (!registered) return <RegistrationView onRegistered={registered => this.onRegistered(registered)} />;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
      
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Row className="main-view justify-content-md-center">
                {selectedMovie
                    ? (
                    <Col xs={12} sm={12} md={8} lg={6}>
                        <MovieView movie={selectedMovie} 
                        onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    </Col>
                    )
                    : movies.map(movie => (
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <MovieCard key={movie._id} movie={movie} 
                        onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                    </Col>
                    ))
                }
            </Row>
        );
    }

}