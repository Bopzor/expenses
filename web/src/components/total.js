import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';

class Total extends Component {
  render() {
    return (
      <Container fluid className="fixed-bottom">
        <Row>
          <Col>Common</Col>
          <Col>Advanced</Col>
          <Col>Total</Col>
          <Col />
        </Row>

        <Row className="nils">
          <Col>333</Col>
          <Col>333</Col>
          <Col>333</Col>
          <Col />
        </Row>

        <Row className="vio">
          <Col>333</Col>
          <Col>333</Col>
          <Col>333</Col>
          <Col />
        </Row>

        <Row>
          <Col>Total: </Col>
          <Col>666</Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default Total;
