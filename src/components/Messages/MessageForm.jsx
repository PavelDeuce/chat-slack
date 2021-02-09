import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Form, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';

import { addMessageToChannel } from '../../service';
import UseFocus from '../../utils/UseFocus';
import UsernameContext from '../../utils/UsernameContext';

const MessageForm = () => {
  const username = useContext(UsernameContext);
  const { currentChannelId } = useSelector((state) => state.channels);
  const [inputRef, setInputFocus] = UseFocus();

  useEffect(() => {
    setInputFocus();
  });

  const formik = useFormik({
    initialValues: { message: '' },
    validationSchema: Yup.object({
      message: Yup.string().trim().required('required'),
    }),
    onSubmit: async (values, actions) => {
      const attributes = {
        body: values.message,
        username,
        date: new Date(),
      };

      try {
        formik.resetForm();
        await addMessageToChannel(currentChannelId, attributes);
      } catch (error) {
        actions.setFieldError('request', error);
      }
    },
  });

  const isDisabledButton = formik.isSubmitting || !formik.isValid;

  return (
    <div className="mt-auto mb-1">
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
          {formik.errors.request
          && (
            <Form.Control.Feedback type="invalid">
              Connection problem
            </Form.Control.Feedback>
          )}
        </div>
        <Button type="submit" className="btn btn-primary" disabled={isDisabledButton}>
          {formik.isSubmitting ? (
            <Spinner animation="border" role="status" variant="light" size="sm" />
          ) : (
            'Submit'
          )}
        </Button>
      </Form>
    </div>
  );
};

export default MessageForm;
