import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AuthenticationContainer = ({ children }) => (
  <Container fluid className="h-100">
    <Row className="h-100 justify-content-center align-content-center">
      <Col md="8" xl="6">
        {children}
      </Col>
    </Row>
  </Container>
);

export default AuthenticationContainer;
