import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';

import List from './list';
import Total from './total';

class Month extends Component {
  render() {
    return (
      <div>
        <Container>

          <Row>
            <Col>Date</Col>
            <Col xs="6">Description</Col>
            <Col>Cost</Col>
            <Col></Col>
          </Row>

          <List />

        </Container>

        <Total />
      </div>
    );
  }
}

export default Month;
