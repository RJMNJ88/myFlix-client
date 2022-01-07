import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card className='movie-card'>
                <Card.Img className='card-img' variant='top' src={movie.ImagePath} crossOrigin='anonymous' />
                <Card.Body className='card-body'>
                    <Card.Title className='card-title' >{movie.Title}</Card.Title>
                    <Card.Text className='card-text'>{movie.Description}</Card.Text>
                </Card.Body>
                <Link to={`/movies/${movie._id}`}>
                    <Button className='card-btn' variant='link'>View Film</Button>
                </Link>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};