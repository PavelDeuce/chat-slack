import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Button, Form, Modal, Spinner,
} from 'react-bootstrap';
import * as Yup from 'yup';

import { useFormik } from 'formik';
import { updateChannel } from '../../service';
import UseFocus from '../../utils/UseFocus';

const RenameChannel = (props) => {
  const { onHide, data } = props;
  const { channels } = useSelector((state) => state.channels);
  const channelsNames = channels.map((ch) => ch.name);
  const [inputRef, setInputFocus] = UseFocus();

  useEffect(() => {
    setInputFocus();
  }, []);

  const formik = useFormik({
    initialValues: {
      newChannelName: data.name,
    },
    validationSchema: Yup.object({
      newChannelName: Yup.string().trim().required('required').notOneOf(channelsNames, 'exist'),
    }),
    onSubmit: async (values, actions) => {
      const { newChannelName: newName } = values;

      try {
        await updateChannel(data.id, newName);
        onHide();
      } catch (error) {
        actions.setFieldError('request', error);
      }
    },
  });

  const isDisabledButton = formik.isSubmitting || !formik.isValid;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Header>
        <Modal.Title>Rename channel</Modal.Title>
        <Button type="button" className="close" onClick={onHide}>
          ×
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          placeholder="Rename channel"
          name="newChannelName"
          className="formControl"
          value={formik.values.newChannelName}
          onChange={formik.handleChange}
          ref={inputRef}
          isInvalid={formik.errors.newChannelName || formik.errors.request}
        />
        {formik.errors.newChannelName === 'exist'
        && (
          <Form.Control.Feedback type="invalid">
            The channel with this name already exists
          </Form.Control.Feedback>
        )}
        {formik.errors.request
        && (
          <Form.Control.Feedback type="invalid">
            Connection problem
          </Form.Control.Feedback>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" type="button" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={isDisabledButton}>
          {formik.isSubmitting ? (
            <Spinner animation="border" role="status" variant="light" size="sm" />
          ) : (
            'Rename'
          )}
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default RenameChannel;
