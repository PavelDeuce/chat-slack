import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

import LanguageSwitcher from './LanguageSwitcher.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import routes from '../../routes.js';
import pagesRoutes from '../../pages/routes.js';

const Header = () => {
  const { t } = useTranslation();
  const { user, logOut } = useAuth();

  return (
    <Navbar bg="light" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to={routes.chatPagePath()}>
          {t('chatSlack')}
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="me-auto">
            {pagesRoutes.map(({ title, path }) => {
              if (!title) return null;
              return (
                <Nav.Link key={path} to={path} as={Link}>
                  {t(title)}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex">
          <LanguageSwitcher />
          {!!user && (
            <Button onClick={logOut} className="ml-3">
              {t('logout')}
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
