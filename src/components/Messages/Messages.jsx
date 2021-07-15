import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Message from './Message';
import MessageForm from './MessageForm';
import { getMessagesForCurrentChannel, getCurrentChannel } from '../../store';

const Messages = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector(getCurrentChannel);
  const messages = useSelector(getMessagesForCurrentChannel);
  const bottomOfChat = useRef(null);

  useEffect(() => {
    bottomOfChat.current.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="mb-4 p-3 bg-light shadow-sm">
        <div className="d-flex flex-column h-100">
          <b className="m-0">{`# ${currentChannel.name}`}</b>
          <span className="text-muted">{`${messages.length} ${t('chat.messages')}`}</span>
        </div>
      </div>
      <div className="overflow-auto mb-3 px-5">
        {messages.map(({ id, username, body, date }) => (
          <Message key={id} username={username} body={body} date={date} />
        ))}
        <div ref={bottomOfChat} />
      </div>
      <MessageForm />
    </div>
  );
};

export default Messages;
