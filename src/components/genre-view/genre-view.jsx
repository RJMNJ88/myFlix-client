import React from "react";
import PropTypes from 'prop-types';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';

import "./genre-view.css";

export class GenreView extends React.Component {
  render () {
    const {genre, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
          
            <Card className="genre-card">
              <Card.Body>
                <Card.Img className='genre-img' variant='top' src='https://miro.medium.com/max/3840/1*jbfWuj3RSAAvmJeBwLWbsw.jpeg' crossOrigin='anonymous' />
                <div className="genre-type">
                  <span className="label">Type: </span>
                  <span className="value">{genre.Name}</span>
                </div>
                <div className="genre-descrip">
                  <span className="label">Description: </span>
                  <span className="value">{genre.Description}</span>
                </div>
                <div >
                  <Button className="genre-btn" size="md" variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
                </div>
              </Card.Body>
            </Card>
            
          </Col>
        </Row>
        
      </Container>
    );
  }
}

GenreView.PropTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string,
  })
}
