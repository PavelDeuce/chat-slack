import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const App = (props) => {
  const { channels } = props;

  return (
    <ListGroup>
      {channels.map((channel) => {
        const { id, name } = channel;

        return (
          <ListGroupItem key={id}>
            {name}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

export default App;
