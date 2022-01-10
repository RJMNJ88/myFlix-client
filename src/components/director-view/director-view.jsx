import React from "react";
import PropTypes from 'prop-types';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';

import "./director-view.css";

export class DirectorView extends React.Component {
  render () {
    const {director, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card className="director-card">
              <Card.Body>
                <Card.Img className='director-img' variant='top' src={director.ImagePath} crossOrigin='anonymous' />
                <div className="dir-name">
                  <span className="label">Name: </span>
                  <span className="value">{director.Name}</span>
                </div>
                <div className="dir-born">
                  <span className="label">Born: </span>
                  <span className="value">{director.Born}</span>
                </div>
                <div className="dir-bio">
                  <span className="label">Bio: </span>
                  <span className="value">{director.Bio}</span>
                </div>
                <div className="dir-films">
                  <span className="label">Popular Films: </span>
                  <span className="value">{director.PopularFilms}</span>
                </div>
                <div >
                  <Button className="dir-btn" size="md" variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
      </Container>
    );
  }
}

DirectorView.PropTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string,
    Born: PropTypes.string,
    // Born: PropTypes.instanceOf(Date),
    Bio: PropTypes.string,
    // PopularFilms: PropTypes.array
    PopularFilms: PropTypes.arrayOf(PropTypes.string)
  })
}
