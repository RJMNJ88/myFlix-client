import React from "react";
import PropTypes from 'prop-types';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';

import "./genre-view.css";

export class GenreView extends React.Component {
  render () {
    const {Genre, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Img className='genre-img' variant='top' src='https://miro.medium.com/max/3840/1*jbfWuj3RSAAvmJeBwLWbsw.jpeg' crossOrigin='anonymous' />
                <div className="type">
                  <span className="label">Type: </span>
                  <span className="value">{Genre.Name}</span>
                </div>
                <div className="description">
                  <span className="label">Description: </span>
                  <span className="value">{Genre.Description}</span>
                </div>
                <div className="backButton">
                  <Button size="md" variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
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
