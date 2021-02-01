import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import {
  Button, Container, Form, Spinner,
} from 'react-bootstrap';

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
    onSubmit: async (values) => {
      const attributes = {
        body: values.message,
        username,
        date: new Date(),
      };

      await addMessageToChannel(currentChannelId, attributes);
      formik.resetForm();
    },
  });

  const isDisabledButton = formik.isSubmitting || formik.values.message === '';

  return (
    <Container className="mt-auto mb-1">
      <Form className="input-form-group" onSubmit={formik.handleSubmit}>
        <Form.Control
          value={formik.values.message}
          onChange={formik.handleChange}
          name="message"
          type="text"
          className="mr-2 form-control"
          ref={inputRef}
        />
        <Button type="submit" className="btn btn-primary" disabled={isDisabledButton}>
          {formik.isSubmitting ? (<Spinner animation="border" role="status" variant="light" size="sm" />)
            : 'Submit'}
        </Button>
      </Form>
    </Container>
  );
};

export default MessageForm;
