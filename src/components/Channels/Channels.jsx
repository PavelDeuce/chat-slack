import React, { useEffect } from 'react';
import { Col, Dropdown, Nav, NavItem, NavLink, Button, ButtonGroup } from 'react-bootstrap';
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
  });

  const handleSelectChannel = (id) => {
    dispatch(switchChannel({ id: Number(id) }));
  };

  const handleAddChannel = () => {
    dispatch(openModal({ data: {}, kind: 'addChannel' }));
  };

  const handleRenameChannel = (id, name) => {
    dispatch(openModal({ data: { id, name }, kind: 'renameChannel' }));
  };

  const handleRemoveChannel = (id, name) => {
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
            <NavItem key={id}>
              <NavLink
                eventKey={id}
                className={classnames(
                  'mb-2 text-left d-flex justify-content-between',
                  btnTypeClass
                )}
              >
                <span>{name}</span>
                {removable && (
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle
                      id={id}
                      className={classnames(btnTypeClass, 'pl-1 pr-1 pt-0 pb-0')}
                    />

                    <Dropdown.Menu>
                      <Dropdown.Item as={Button} onClick={() => handleRenameChannel(id, name)}>
                        Rename
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item as={Button} onClick={() => handleRemoveChannel(id, name)}>
                        Remove
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
    </Col>
  );
};

export default Channels;
