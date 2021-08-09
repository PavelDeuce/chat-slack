import React from 'react';
import { Nav, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Channel from './Channel.jsx';
import { actions, getChannelsInfo } from '../../store/index.js';
import { modalKinds } from '../../constants.js';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector(getChannelsInfo);

  const handleSelectChannel = (id) => {
    dispatch(actions.switchChannel({ id: Number(id) }));
  };

  const handleAddChannel = () => {
    dispatch(actions.openModal({ data: {}, kind: modalKinds.addChannel }));
  };

  const handleChangeChannel = (id, name, kind) => () => {
    dispatch(actions.openModal({ data: { id, name }, kind }));
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
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            isCurrent={channel.id === currentChannelId}
            channel={channel}
            handleChangeChannel={handleChangeChannel}
          />
        ))}
      </Nav>
    </>
  );
};

export default Channels;
