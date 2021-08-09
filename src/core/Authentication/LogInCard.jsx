import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import routes from '../../routes.js';
import LogInForm from './LogInForm.jsx';
import logInImage from '../../../assets/images/log-in-img.jpeg';

const LogInCard = () => {
  const { t } = useTranslation();

  return (
    <Card className="shadow-sm">
      <Card.Body className="p-5">
        <Row>
          <Col md="6" className="d-flex align-items-center justify-content-center">
            <img
              width="200"
              height="200"
              className="rounded-circle"
              src={logInImage}
              alt={t('logIn.imageAlt')}
            />
          </Col>
          <Col md="6" className="mt-3">
            <h1 className="text-center mb-4">{t('logIn.logIn')}</h1>
            <LogInForm />
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="p-4">
        <div className="text-center">
          <p className="m-0">{t('logIn.newToChat')}</p>
          <Link to={routes.signupPagePath()}>{t('logIn.signUp')}</Link>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default LogInCard;
