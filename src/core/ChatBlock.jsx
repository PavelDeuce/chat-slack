import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Col, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import routes from '../routes.js';
import { getChatData } from '../service.js';
import Channels from './Channels/Channels.jsx';
import Messages from './Messages/Messages.jsx';
import { actions } from '../store';

const ChatBlock = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [fetching, setFetching] = useState(true);
  const history = useHistory();
  useEffect(() => {
    // eslint-disable-next-line functional/no-let
    let didMount = true;
    const fetchData = async () => {
      try {
        const res = await getChatData();
        if (didMount) setFetching(false);
        dispatch(actions.setInitialState(res.data));
      } catch (err) {
        if (!err.isAxiosError) {
          throw err;
        }

        if (err.response.status === 401) {
          history.push(routes.loginPagePath());
        }
        // TODO: network error to toast
        throw err;
      }
    };

    fetchData();

    return () => {
      didMount = false;
    };
  }, [dispatch, history]);

  return fetching ? (
    <Spinner animation="grow" role="status" variant="primary">
      <span className="sr-only">{t('loading')}</span>
    </Spinner>
  ) : (
    <>
      <Col className="col-3 p-2 border-right h-100 overflow-auto">
        <Channels />
      </Col>
      <Col className="h-100 p-0">
        <Messages />
      </Col>
    </>
  );
};

export default ChatBlock;
