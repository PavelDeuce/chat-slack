import React from 'react';
import { Container, Row } from 'react-bootstrap';

const AppContainer = ({ children }) => (
  <Container className="h-100 my-4 rounded shadow overflow-hidden">
    <Row className="h-100">{children}</Row>
  </Container>
);

export default AppContainer;
