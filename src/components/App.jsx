import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';

import Channels from './Channels/Channels';
import Messages from './Messages/Messages';
import ModalContainer from './Modals';

const App = () => {
  const { kind } = useSelector((state) => state.modals.modalState);

  const renderModal = (kindOfModal) => {
    if (!kindOfModal) {
      return null;
    }

    return <ModalContainer kind={kindOfModal} />;
  };

  return (
    <Row className="h-100 pb-3">
      <Channels />
      <Messages />
      {renderModal(kind)}
    </Row>
  );
};

export default App;
