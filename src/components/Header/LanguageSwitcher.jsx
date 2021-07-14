import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const availableLanguages = [
    { id: 1, value: 'ru', view: 'Русский' },
    { id: 2, value: 'en', view: 'English' },
  ];
  return (
    <div className="w-25">
      <select
        className="form-control"
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        {availableLanguages.map(({ id, value, view }) => (
          <option key={id} value={value}>
            {view}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
