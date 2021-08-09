import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDistanceToNow } from 'date-fns';
import russianLocale from 'date-fns/locale/ru';

const Message = ({ username, body, date }) => {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'ru' ? { locale: russianLocale } : {};
  const formattedDate = formatDistanceToNow(new Date(date), { ...locale });
  return (
    <div className="d-flex justify-content-between align-content-center mb-2 text-break">
      <span className="w-75">
        <b>{username}</b>
        {': '}
        {body}
      </span>
      <span className="pr-3 text-muted small text-nowrap">{formattedDate}</span>
    </div>
  );
};

export default Message;
