import React, { useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Message from './Message';
import MessageForm from './MessageForm';
import { getMessagesForCurrentChannel, getCurrentChannel } from '../../store';

const Messages = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector(getCurrentChannel);
  const messages = useSelector(getMessagesForCurrentChannel);
  const messagesContainerId = 'messages-container';

  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: messagesContainerId, delay: 0, duration: 300 });
  }, [messages.length]);

  return (
    <div className="d-flex flex-column h-100">
      <div className="mb-4 p-3 bg-light shadow-sm">
        <div className="d-flex flex-column h-100">
          <b className="m-0">{`# ${currentChannel.name}`}</b>
          <span className="text-muted">{t('chat.messages', { count: messages.length })}</span>
        </div>
      </div>
      <div id={messagesContainerId} className="overflow-auto mb-3 px-5">
        {messages.map(({ id, username, body, date }) => (
          <Message key={id} username={username} body={body} date={date} />
        ))}
      </div>
      <MessageForm />
    </div>
  );
};

export default Messages;
