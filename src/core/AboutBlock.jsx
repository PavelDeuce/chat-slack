import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getYear } from 'date-fns';

import hexletLogo from '../../assets/images/hexlet-logo.png';

const AboutBlock = () => {
  const { t } = useTranslation();
  const profileLink = 'https://ru.hexlet.io/u/paveldeuce';
  const currentYear = getYear(new Date());
  const imageSize = 250;

  return (
    <Col className="p-5 w-100 d-flex justify-content-between flex-wrap">
      <div className="w-100 h-75">
        <h3 className="mb-4">{t('about.headline')}</h3>
        <div className="d-flex justify-content-between">
          <p className="text-break w-50">{t('about.text')}</p>
          <Link target="_blank" to={{ pathname: profileLink }}>
            <img
              src={hexletLogo}
              width={imageSize}
              height={imageSize}
              alt={t('about.imageAlt')}
              className="shadow-lg"
            />
          </Link>
        </div>
      </div>
      <div className="w-100">
        <hr />
        <p className="text-center">
          <span className="mr-1">&copy;</span>
          <span className="mr-2">{t('about.rights')}</span>
          <span>{`2020 - ${currentYear}`}</span>
        </p>
      </div>
    </Col>
  );
};

export default AboutBlock;
