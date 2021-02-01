import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import moment from 'moment';

import MessageForm from './MessageForm';

const Messages = () => {
  const { messages, currentChannelId } = useSelector((state) => ({
    messages: state.messages.data,
    currentChannelId: state.channels.currentChannelId,
  }));

  const bottomOfChat = useRef(null);

  useEffect(() => {
    bottomOfChat.current.scrollIntoView({ behavior: 'smooth' });
  });

  const messagesByChannelId = messages.filter((message) => message.channelId === currentChannelId);

  return (
    <Col className="h-100">
      <div className="d-flex flex-column h-100">
        <div className="overflow-auto mb-3">
          {messagesByChannelId.map((message) => {
            const {
              id, username, body, date,
            } = message;
            const formattedDate = moment(date).fromNow();

            return (
              <div className="d-flex justify-content-between mb-1 text-break" key={id}>
                <>
                  <span className="w-75">
                    <b>{username}</b>
                    {': '}
                    {body}
                  </span>
                  <span className="pr-3 text-muted">{formattedDate}</span>
                </>
              </div>
            );
          })}
          <div ref={bottomOfChat} />
        </div>
        <MessageForm />
      </div>
    </Col>
  );
};

export default Messages;
