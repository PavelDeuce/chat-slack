import React, { useEffect } from 'react';
import { Col, Dropdown, Nav, NavItem, NavLink, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import { switchChannel } from '../../store/channelsSlice';
import { openModal } from '../../store/modalsSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const { data: channels, currentChannelId } = useSelector((state) => state.channels);

  useEffect(() => {
    if (currentChannelId === null) {
      dispatch(switchChannel({ id: channels[0].id }));
    }
  }, [currentChannelId, channels]);

  const handleSelectChannel = (id) => {
    dispatch(switchChannel({ id: Number(id) }));
  };

  const handleAddChannel = () => {
    dispatch(openModal({ data: {}, kind: 'addChannel' }));
  };

  const handleRenameChannel = (id, name) => () => {
    dispatch(openModal({ data: { id, name }, kind: 'renameChannel' }));
  };

  const handleRemoveChannel = (id, name) => () => {
    dispatch(openModal({ data: { id, name }, kind: 'removeChannel' }));
  };

  return (
    <Col className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link" onClick={handleAddChannel}>
          +
        </button>
      </div>
      <Nav
        variant="pills"
        className="flex-column"
        activeKey={currentChannelId}
        onSelect={handleSelectChannel}
      >
        {channels.map((channel) => {
          const { id, name, removable } = channel;
          const btnTypeClass = id === currentChannelId ? '' : 'btn-light';

          return (
            <NavItem
              key={id}
              as={ButtonGroup}
              className="d-flex justify-content-between mb-1 text-left"
            >
              <NavLink eventKey={id} className={classnames(btnTypeClass, 'w-100 rounded-0')}>
                <span>{name}</span>
              </NavLink>
              {removable && (
                <Dropdown>
                  <Dropdown.Toggle
                    id={id}
                    className={classnames(btnTypeClass, 'h-100 rounded-0')}
                  />

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleRenameChannel(id, name)}>Rename</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleRemoveChannel(id, name)}>Remove</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </NavItem>
          );
        })}
      </Nav>
    </Col>
  );
};

export default Channels;
