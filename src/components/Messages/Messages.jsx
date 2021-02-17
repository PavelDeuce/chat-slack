import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';

import MessageForm from './MessageForm';

const Messages = () => {
  const { currentChannelId } = useSelector((state) => ({
    currentChannelId: state.channelsState.currentChannelId,
  }));
  const { messages } = useSelector((state) => ({
    messages: state.messagesState.messages.filter((m) => m.channelId === currentChannelId),
  }));

  const bottomOfChat = useRef(null);

  useEffect(() => {
    bottomOfChat.current.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <Col className="h-100">
      <div className="d-flex flex-column h-100">
        <div className="overflow-auto mb-3">
          {messages.map((message) => {
            const {
              id, username, body, date,
            } = message;
            const formattedDate = formatDistanceToNow(new Date(date));

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
