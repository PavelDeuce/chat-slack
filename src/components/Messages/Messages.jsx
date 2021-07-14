import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';

import MessageForm from './MessageForm';

const Messages = () => {
  const { t } = useTranslation();
  const { currentChannelId, currentChannelName } = useSelector((state) => ({
    currentChannelId: state.channelsState.currentChannelId,
    currentChannelName: state.channelsState.channels.find(
      (ch) => ch.id === state.channelsState.currentChannelId
    ).name,
  }));
  const { messages } = useSelector((state) => ({
    messages: state.messagesState.messages.filter((m) => m.channelId === currentChannelId),
  }));

  const bottomOfChat = useRef(null);

  useEffect(() => {
    bottomOfChat.current.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="mb-4 p-3 bg-light shadow-sm">
        <div className="d-flex flex-column h-100">
          <b className="m-0">{`# ${currentChannelName}`}</b>
          <span className="text-muted">{`${messages.length} ${t('chat.messages')}`}</span>
        </div>
      </div>
      <div className="overflow-auto mb-3 px-5">
        {messages.map((message) => {
          const { id, username, body, date } = message;
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
  );
};

export default Messages;
