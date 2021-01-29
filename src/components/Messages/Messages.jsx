import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import MessageForm from './MessageForm';

const Messages = () => {
  const { messages, currentChannelId } = useSelector((state) => ({
    messages: state.messages.data,
    currentChannelId: state.channels.currentChannelId,
  }));

  const messagesByChannelId = messages.filter((message) => message.channelId === currentChannelId);

  return (
    <Col className="h-100">
      <div className="d-flex flex-column h-100">
        <div className="overflow-auto mb-3">
          {messagesByChannelId.map((message) => {
            const { id, username, body } = message;

            return (
              <div className="text-break" key={id}>
                <>
                  <b>{username}</b>
                  {' '}
                  {body}
                </>
              </div>
            );
          })}
        </div>
        <MessageForm />
      </div>
    </Col>
  );
};

export default Messages;
