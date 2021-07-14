import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import Channels from './Channels/Channels';
import Messages from './Messages/Messages';
import ModalContainer from './Modals';
import Header from './Header/Header';

const App = () => {
  const { kind } = useSelector((state) => state.modalsState.modal);

  const renderModal = (kindOfModal) => {
    if (!kindOfModal) return null;
    return <ModalContainer kind={kindOfModal} />;
  };

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container className="h-100 my-4 rounded shadow overflow-hidden">
        <Row className="h-100">
          <Col className="col-3 p-2 border-right h-100 overflow-auto">
            <Channels />
          </Col>
          <Col className="h-100 p-0">
            <Messages />
          </Col>
          {renderModal(kind)}
        </Row>
      </Container>
    </div>
  );
};

export default App;
