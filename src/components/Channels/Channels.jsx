import React, { useEffect } from 'react';
import {
  Col,
  Dropdown,
  Nav,
  NavItem,
  NavLink,
  Button,
  ButtonGroup,
  Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import { switchChannel } from '../../store/channelsSlice';
import { openModal } from '../../store/modalsSlice';
import { modalKinds, defaultChannelId } from '../../utils/appConstants';

const Channels = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channelsState);

  useEffect(() => {
    const isCurrentChannelExist = channels.find((ch) => ch.id === currentChannelId);
    if (!isCurrentChannelExist) {
      dispatch(switchChannel({ id: defaultChannelId }));
    }
  }, [channels, dispatch, currentChannelId]);

  const handleSelectChannel = (id) => {
    dispatch(switchChannel({ id: Number(id) }));
  };

  const handleAddChannel = () => {
    dispatch(openModal({ data: {}, kind: modalKinds.addChannel }));
  };

  const handleChangeChannel = (id, name, kind) => () => {
    dispatch(openModal({ data: { id, name }, kind }));
  };

  return (
    <Col className="col-3 border-right h-100 overflow-auto">
      <Container className="d-flex mb-2">
        <span className="font-weight-bold">Channels</span>
        <Button
          variant="light"
          type="button"
          className="ml-auto pt-0 pb-0 pl-1 pr-1"
          onClick={handleAddChannel}
        >
          +
        </Button>
      </Container>
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
              <NavLink
                eventKey={id}
                className={classnames(btnTypeClass, 'w-100 text-break rounded-0')}
              >
                <span>{name}</span>
              </NavLink>
              {removable && (
                <Dropdown>
                  <Dropdown.Toggle
                    id={id}
                    className={classnames(btnTypeClass, 'h-100 rounded-0')}
                  />

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={handleChangeChannel(id, name, modalKinds.renameChannel)}
                    >
                      Rename
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={handleChangeChannel(id, name, modalKinds.removeChannel)}
                    >
                      Remove
                    </Dropdown.Item>
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
