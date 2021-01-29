import React from 'react';
import {
  Col, Nav, NavItem, NavLink,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { switchChannel } from '../../store/channelsSlice';
import { openModal } from '../../store/modalsSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const { data: channels, currentChannelId } = useSelector((state) => state.channels);

  const handleSelectChannel = (id) => {
    dispatch(switchChannel({ id: Number(id) }));
  };

  const handleAddChannel = () => {
    dispatch(openModal({ data: {}, kind: 'addChannel' }));
  };

  const handleRenameChannel = (id, newName) => {
    dispatch(openModal({ data: { id, newName }, kind: 'renameChannel' }));
  };

  const handleRemoveChannel = (id) => {
    dispatch(openModal({ data: { id }, kind: 'removeChannel' }));
  };

  return (
    <Col className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link" onClick={handleAddChannel}>
          +
        </button>
      </div>
      <Nav variant="pills" className="flex-column" activeKey={currentChannelId} onSelect={handleSelectChannel}>
        {channels.map((channel) => {
          const { id, name } = channel;

          return (
            <NavItem key={id}>
              <NavLink eventKey={id} className="btn-block mb-2 text-left btn">
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
