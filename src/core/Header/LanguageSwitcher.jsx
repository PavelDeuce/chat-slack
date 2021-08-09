import React, { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import FlagRu from '../../../assets/icons/flag-ru.svg';
import FlagEn from '../../../assets/icons/flag-en.svg';
import LanguageIcon from './LanguageIcon.jsx';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const availableLanguages = [
    { value: 'ru', view: t('languages.ru'), Icon: FlagRu },
    { value: 'en', view: t('languages.en'), Icon: FlagEn },
  ];
  const findLanguageByValue = (value) => availableLanguages.find((l) => l.value === value);
  const [currentLanguage, setCurrentLanguage] = useState(findLanguageByValue(i18n.language));

  const changeLanguage = (value) => () => {
    setCurrentLanguage(findLanguageByValue(value));
    return i18n.changeLanguage(value);
  };

  return (
    <>
      <NavDropdown
        title={<LanguageIcon Icon={currentLanguage.Icon} value={currentLanguage.value} />}
        id="language-dropdown"
      >
        {availableLanguages
          .filter((l) => l.value !== currentLanguage.value)
          .map(({ value, view, Icon }) => (
            <NavDropdown.Item
              key={value}
              eventKey={value}
              onClick={changeLanguage(value)}
              className="d-flex align-items-center"
            >
              <LanguageIcon Icon={Icon} value={value} />
              <span>{view}</span>
            </NavDropdown.Item>
          ))}
      </NavDropdown>
    </>
  );
};

export default LanguageSwitcher;
