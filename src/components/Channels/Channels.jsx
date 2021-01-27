import React from 'react';
import {
  Col, Nav, NavItem, NavLink,
} from 'react-bootstrap';

const Channels = (props) => {
  const { channels } = props;

  return (
    <Col className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link">+</button>
      </div>
      <Nav className="flex-column">
        {channels.map((channel) => {
          const { id, name } = channel;

          return (
            <NavItem key={id}>
              <NavLink className="btn-block mb-2 text-left btn btn-light">
                {name}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
    </Col>
  );
};

export default Channels;
