import React, { useEffect } from 'react';
import {
  Button, Form, Modal, Spinner,
} from 'react-bootstrap';

import { useFormik } from 'formik';
import { updateChannel } from '../../service';
import useFocus from '../../utils/useFocus';

const RenameChannel = (props) => {
  const { onHide, data } = props;
  const [inputRef, setInputFocus] = useFocus();

  useEffect(() => {
    setInputFocus();
  });

  const formik = useFormik({
    initialValues: {
      channel: data.name,
    },
    onSubmit: async (values) => {
      const { channel: newName } = values;
      await updateChannel(data.id, newName);
      onHide();
    },
  });

  const isDisabledButton = formik.isSubmitting || formik.values.channel === '';

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
            'Rename'
          )}
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default RenameChannel;
