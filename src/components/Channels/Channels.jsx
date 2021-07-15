import React from 'react';
import { Nav, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Channel from './Channel';
import { switchChannel } from '../../store/channelsSlice';
import { openModal } from '../../store/modalsSlice';
import { getChannelsInfo } from '../../store';
import { modalKinds } from '../../constants';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector(getChannelsInfo);

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
