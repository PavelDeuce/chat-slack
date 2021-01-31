import React from 'react';
import { useFormik } from 'formik';
import { Form, Modal } from 'react-bootstrap';

import { removeChannel } from '../../service';

const RemoveChannel = (props) => {
  const { onHide, data } = props;
  const { id, name } = data;

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      await removeChannel(id);
      onHide();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Header>
        <Modal.Title>Remove channel</Modal.Title>
        <button type="button" className="close" onClick={onHide}>×</button>
      </Modal.Header>
      <Modal.Body>
        Delete a channel with name
        {' - '}
        {name}
        {'?'}
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
        <button type="submit" className="btn btn-danger">Delete</button>
      </Modal.Footer>
    </Form>
  );
};

export default RemoveChannel;
