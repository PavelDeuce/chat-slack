import React, { useEffect, useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { logIn } from '../../service.js';
import routes from '../../routes.js';
import useAuth from '../../hooks/useAuth.jsx';

const LogInForm = () => {
  const { t } = useTranslation();
  const [logInFailed, setLogInFailed] = useState(false);
  const inputRef = useRef();
  const auth = useAuth();
  const location = useLocation();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setLogInFailed(false);

      try {
        const res = await logIn(values);
        localStorage.setItem('user', JSON.stringify(res.data));
        auth.logIn({ username: res.data.username });
        const { from } = location.state || { from: { pathname: routes.chatPagePath() } };
        history.replace(from);
      } catch (err) {
        if (!err.isAxiosError) throw err;

        if (err.response.status === 401) {
          setLogInFailed(true);
          inputRef.current.select();
          return;
        }

        throw err;
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="username">{t('logIn.form.username')}</Form.Label>
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          name="username"
          id="username"
          autoComplete="username"
          isInvalid={logInFailed}
          required
          ref={inputRef}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">{t('logIn.form.password')}</Form.Label>
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          name="password"
          id="password"
          autoComplete="current-password"
          isInvalid={logInFailed}
          required
        />
        <Form.Control.Feedback type="invalid">{t('logIn.form.authFailed')}</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3 mt-2">
        {t('logIn.form.submit')}
      </Button>
    </Form>
  );
};

export default LogInForm;
