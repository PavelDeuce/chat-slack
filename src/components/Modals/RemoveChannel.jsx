import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';

import { removeChannel } from '../../service';
import useFocus from '../../utils/useFocus';

const RemoveChannel = (props) => {
  const { onHide, data } = props;
  const { id, name } = data;

  const [deleteButtonRef, setDeleteButtonFocus] = useFocus();

  useEffect(() => {
    setDeleteButtonFocus();
  });

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
        <Button type="button" className="close" onClick={onHide}>
          ×
        </Button>
      </Modal.Header>
      <Modal.Body>
        Delete a channel with name
        {' - '}
        {name}
        {'?'}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" type="button" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" type="submit" ref={deleteButtonRef}>
          Delete
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default RemoveChannel;
