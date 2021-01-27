import React from 'react';
import { Row } from 'react-bootstrap';

import Channels from './Channels/Channels';
import Messages from './Messages/Messages';

const App = (props) => {
  const { channels } = props;

  return (
    <Row className="h-100 pb-3">
      <Channels channels={channels} />
      <Messages />
    </Row>
  );
};

export default App;
