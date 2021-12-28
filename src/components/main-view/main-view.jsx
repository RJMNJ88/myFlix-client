import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [
                // { 
                //     _id: 1, 
                //     Title: 'Inception', 
                //     Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.', 
                //     ImagePath: '../../../img/inception'
                // },
                // { 
                //     _id: 2, 
                //     Title: 'The Shawshank Redemption', 
                //     Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 
                //     ImagePath: '../../../img/shawshank'
                // },
                // { 
                //     _id: 3, 
                //     Title: 'Gladiator', 
                //     Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', 
                //     ImagePath: '../../../img/gladiator'
                // }
            ],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount(){
        axios.get('https://blooming-wildwood-80599.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
        });
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
      
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                     ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                     : movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)
                }
            </div>
        );
    }

}