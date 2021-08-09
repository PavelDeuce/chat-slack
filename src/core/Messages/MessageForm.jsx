import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Form, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';

import useFocus from '../../hooks/useFocus.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import useApi from '../../hooks/useApi.jsx';
import { getChannelsInfo } from '../../store';

const MessageForm = () => {
  const { t } = useTranslation();
  const {
    user: { username },
  } = useAuth();
  const { sendMessage } = useApi();
  const { currentChannelId } = useSelector(getChannelsInfo);
  const [inputRef, setInputFocus] = useFocus();

  useEffect(() => {
    setInputFocus();
  }, [setInputFocus]);

  const formik = useFormik({
    initialValues: { message: '' },
    validationSchema: Yup.object({
      message: Yup.string().trim().required('required'),
    }),
    onSubmit: async (values, actions) => {
      const message = {
        body: values.message,
        channelId: currentChannelId,
        username,
      };

      try {
        await sendMessage(message);
        formik.resetForm();
        setInputFocus();
      } catch (error) {
        actions.setFieldError('request', error);
      }
    },
  });

  const isDisabledButton = formik.isSubmitting;

  return (
    <div className="mt-auto mb-1 p-2">
      <Form className="d-flex align-items-baseline" onSubmit={formik.handleSubmit}>
        <div className="input-form-group mr-2">
          <Form.Control
            value={formik.values.message}
            onChange={formik.handleChange}
            name="message"
            type="text"
            className="form-control"
            ref={inputRef}
            isInvalid={formik.errors.request}
          />
          {formik.errors.request && (
            <Form.Control.Feedback type="invalid">Connection problem</Form.Control.Feedback>
          )}
        </div>
        <Button type="submit" className="btn btn-primary" disabled={isDisabledButton}>
          {formik.isSubmitting ? (
            <Spinner animation="border" role="status" variant="light" size="sm" />
          ) : (
            t('chat.send')
          )}
        </Button>
      </Form>
    </div>
  );
};

export default MessageForm;
