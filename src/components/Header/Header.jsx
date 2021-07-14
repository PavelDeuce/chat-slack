import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Navbar } from 'react-bootstrap';

import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();

  return (
    <Navbar bg="light" className="shadow">
      <Container>
        <Navbar.Brand href="/">{t('chatSlack')}</Navbar.Brand>
        <LanguageSwitcher />
      </Container>
    </Navbar>
  );
};

export default Header;
