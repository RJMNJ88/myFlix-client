import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;
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
                            <Link to={`/directors/${movie.Director.Name}`}>
                                <Button variant="link">Director</Button>
                            </Link>

                            <Link to={`/genres/${movie.Genre.Name}`}>
                                <Button variant="link">Genre</Button>
                            </Link>
                            <Button className='movie-btn' onClick={() => { onBackClick(null); }}>Back</Button>
                        </div>
                    </Card.Body>
                </Card>
            </CardGroup>
        );
    }
    
}