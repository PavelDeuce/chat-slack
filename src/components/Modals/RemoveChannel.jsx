import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, Modal, Spinner,
} from 'react-bootstrap';

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
        Do you want to delete a channel with name
        {' - '}
        {name}
        {'?'}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" type="button" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" type="submit" ref={deleteButtonRef} disabled={formik.isSubmitting}>
          {formik.isSubmitting ? (<Spinner animation="border" role="status" variant="light" size="sm" />)
            : 'Delete'}
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default RemoveChannel;
