import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';

import { addChannel } from '../../service';

const AddChannel = (props) => {
  const { onHide } = props;

  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    onSubmit: async (values, actions) => {
      const { channel: name } = values;
      await addChannel(name);
      actions.resetForm();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Header>
        <Modal.Title>Add channel</Modal.Title>
        <button type="button" className="close" onClick={onHide}>×</button>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          placeholder="New channel"
          name="channel"
          className="formControl"
          value={formik.values.channel}
          onChange={formik.handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </Modal.Footer>
    </Form>
  );
};

export default AddChannel;
