import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import SignUpForm from './SignUpForm.jsx';
import routes from '../../routes.js';
import signUpImage from '../../../assets/images/sign-up-img.jpeg';

const SignUpCard = () => {
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
              src={signUpImage}
              alt={t('signUp.imageAlt')}
            />
          </Col>
          <Col md="6" className="mt-3">
            <h1 className="text-center mb-4">{t('signUp.signUp')}</h1>
            <SignUpForm />
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="p-4">
        <div className="text-center">
          <p className="m-0">{t('signUp.existAcc')}</p>
          <Link to={routes.loginPagePath()}>{t('signUp.logIn')}</Link>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default SignUpCard;
