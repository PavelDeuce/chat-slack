import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal, Form, Button, Spinner,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { addChannel } from '../../service';
import UseFocus from '../../utils/UseFocus';

const AddChannel = (props) => {
  const { onHide } = props;
  const { channels } = useSelector((state) => state.channels);
  const channelsNames = channels.map((ch) => ch.name);
  const [inputRef, setInputFocus] = UseFocus();

  useEffect(() => {
    setInputFocus();
  });

  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    validationSchema: Yup.object({
      channel: Yup.string().trim().required('required').notOneOf(channelsNames, 'exist'),
    }),
    onSubmit: async (values, actions) => {
      const { channel: name } = values;
      await addChannel(name);
      actions.resetForm();
      onHide();
    },
  });

  const isDisabledButton = formik.isSubmitting || !formik.isValid;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Header>
        <Modal.Title>Add channel</Modal.Title>
        <Button type="button" className="close" onClick={onHide}>
          ×
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          placeholder="New channel"
          name="channel"
          className="formControl"
          value={formik.values.channel}
          onChange={formik.handleChange}
          ref={inputRef}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" type="button" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={isDisabledButton}>
          {formik.isSubmitting ? (
            <Spinner animation="border" role="status" variant="light" size="sm" />
          ) : (
            'Add'
          )}
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default AddChannel;
