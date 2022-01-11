import React from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import { Card, CardGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  constructor () {
    super();
  }

  addFav(props) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.post(`https://blooming-wildwood-80599.herokuapp.com/Users/${username}/Movies/${this.props.movie._id}`,
    {},
    {
    headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      alert('Movie Added to Favorites')
    })
    .catch(function(error) {
      console.log(error);
    });
  }

    render() {
        const { movie, onBackClick, } = this.props;
        return (
            <CardGroup className='view-card'>
                <Card className='card'>
                    <Card.Body className='card-body'>
                        <Card.Img className='view-img' variant='top' src={movie.ImagePath} crossOrigin='anonymous' />
                        <div className="movie-view">
                            <div className="movie-title">
                                <span className="label">Title: </span>
                                <span className="value">{movie.Title}</span>
                            </div>
                            <div className="movie-description">
                                <span className="label">Description: </span>
                                <span className="value">{movie.Description}</span>
                            </div>
                            <div className='director-container'>
                              <span className='dir-span'>Director: </span>                              
                              <Link to={`/directors/${movie.Director.Name}`}>
                                <span variant="link">{movie.Director.Name}</span>
                              </Link>                              
                            </div>  
                            <div className='genre-container'>
                              <span className='genre-span'>Genre: </span> 
                              <Link to={`/genres/${movie.Genre.Name}`}>
                                  <span variant="link">{movie.Genre.Name}</span>
                              </Link>
                            </div>  
                            <div className='back-add-container'>
                              <Button className='movie-back-btn' onClick={() => { onBackClick(null); }}>Back</Button>
                              <Button className="add-btn" value={movie._id} onClick={(e) => this.addFav(e, movie)}>Add to Favorites</Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </CardGroup>
        );
    }
    
}

MovieView.propTypes = {
  movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Director: PropTypes.shape({
          Name: PropTypes.string.isRequired
      }).isRequired,
      Genre: PropTypes.shape({
          Name: PropTypes.string.isRequired
      }).isRequired
  }).isRequired,
}

