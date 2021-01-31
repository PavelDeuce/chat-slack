import React from 'react';
import { Form, Modal } from 'react-bootstrap';

import { useFormik } from 'formik';
import { updateChannel } from '../../service';

const RenameChannel = (props) => {
  const { onHide, data } = props;

  const formik = useFormik({
    initialValues: {
      channel: data.name,
    },
    onSubmit: async (values, actions) => {
      const { channel: newName } = values;
      await updateChannel(data.id, newName);
      actions.resetForm();
      onHide();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Header>
        <Modal.Title>Rename channel</Modal.Title>
        <button type="button" className="close" onClick={onHide}>×</button>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          placeholder="Rename channel"
          name="channel"
          className="formControl"
          value={formik.values.channel}
          onChange={formik.handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
        <button type="submit" className="btn btn-primary">Rename</button>
      </Modal.Footer>
    </Form>
  );
};

export default RenameChannel;
