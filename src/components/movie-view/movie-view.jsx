import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;
        return (

            <CardGroup className='view-card'>
                <Card>
                    <Card.Body>
                        <div className="movie-view">
                            <div className="movie-poster">
                                <img src={movie.ImagePath} crossOrigin='anonymous'/>
                            </div>
                            <div className="movie-title">
                                <span className="label">Title: </span>
                                <span className="value">{movie.Title}</span>
                            </div>
                            <div className="movie-description">
                                <span className="label">Description: </span>
                                <span className="value">{movie.Description}</span>
                            </div>
                            <Button className='movie-btn' onClick={() => { onBackClick(null); }}>Back</Button>
                        </div>
                    </Card.Body>
                </Card>
            </CardGroup>
        );
    }
    
}