import React from 'react';
import { Dropdown, Nav, NavItem, NavLink, Button, ButtonGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import { switchChannel } from '../../store/channelsSlice';
import { openModal } from '../../store/modalsSlice';
import { modalKinds } from '../../utils/appConstants';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.channelsState);

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
    <>
      <Container className="d-flex mb-2 mt-3">
        <span className="font-weight-bold">{t('channels.channels')}</span>
        <Button
          variant="outline-primary"
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
                <span>
                  {'# '}
                  {name}
                </span>
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
                      {t('channels.rename')}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={handleChangeChannel(id, name, modalKinds.removeChannel)}
                    >
                      {t('channels.remove')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </NavItem>
          );
        })}
      </Nav>
    </>
  );
};

export default Channels;
