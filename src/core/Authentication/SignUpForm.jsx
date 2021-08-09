import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import routes from '../../routes.js';
import { signUp } from '../../service.js';
import useAuth from '../../hooks/useAuth.jsx';

const SignUpForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [signUpFailed, setSignUpFailed] = useState(false);
  const inputRef = useRef();
  const history = useHistory();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required('signUp.form.required')
      .min(3, 'signUp.form.usernameConstraints')
      .max(20, 'signUp.form.usernameConstraints'),
    password: yup.string().trim().required('signUp.form.required').min(6, 'signUp.form.passMin'),
    confirmPassword: yup
      .string()
      .test(
        'confirmPassword',
        'signUp.mustMatch',
        (value, context) => value === context.parent.password
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setSignUpFailed(false);

      try {
        const res = signUp({
          username: values.username,
          password: values.password,
        });
        localStorage.setItem('user', JSON.stringify(res.data));
        auth.logIn({ username: res.data.username });
        history.push(routes.chatPagePath());
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setSignUpFailed(true);
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
    <Form onSubmit={formik.handleSubmit} className="p-3">
      <Form.Group>
        <Form.Label htmlFor="username">{t('signUp.form.username')}</Form.Label>
        <Form.Control
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder={t('signup.usernameConstraints')}
          name="username"
          id="username"
          autoComplete="username"
          isInvalid={(formik.errors.username && formik.touched.username) || signUpFailed}
          required
          ref={inputRef}
        />
        <Form.Control.Feedback type="invalid">{t(formik.errors.username)}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">{t('signUp.form.password')}</Form.Label>
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder={t('signup.passMin')}
          name="password"
          id="password"
          isInvalid={(formik.errors.password && formik.touched.password) || signUpFailed}
          required
          autoComplete="new-password"
        />
        <Form.Control.Feedback type="invalid">{t(formik.errors.password)}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="confirmPassword">{t('signUp.form.confirmPassword')}</Form.Label>
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          placeholder={t('signup.mustMatch')}
          name="confirmPassword"
          id="confirmPassword"
          isInvalid={
            (formik.errors.confirmPassword && formik.touched.confirmPassword) || signUpFailed
          }
          required
          autoComplete="new-password"
        />
        <Form.Control.Feedback type="invalid">
          {signUpFailed ? t('signup.existAcc') : t(formik.errors.confirmPassword)}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100">
        {t('signUp.form.submit')}
      </Button>
    </Form>
  );
};

export default SignUpForm;
