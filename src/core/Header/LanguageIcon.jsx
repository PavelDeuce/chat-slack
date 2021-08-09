import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageIcon = ({ Icon, value }) => {
  const { t } = useTranslation();
  const size = 25;
  return (
    <img
      src={Icon}
      alt={t('languages.switchIcon', { value })}
      width={size}
      height={size}
      className="mr-2"
    />
  );
};

export default LanguageIcon;
