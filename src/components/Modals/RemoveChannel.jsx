import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, Modal, Spinner, Alert,
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { removeChannel } from '../../service';
import UseFocus from '../../utils/UseFocus';
import { switchChannel } from '../../store/channelsSlice';
import { defaultChannelId } from '../../utils/appConstants';

const RemoveChannel = (props) => {
  const dispatch = useDispatch();
  const { onHide, data } = props;
  const { id, name } = data;

  const { currentChannelId } = useSelector((state) => state.channels);
  const [deleteButtonRef, setDeleteButtonFocus] = UseFocus();

  useEffect(() => {
    setDeleteButtonFocus();
  });

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values, actions) => {
      try {
        await removeChannel(id);
        onHide();

        if (id === currentChannelId) {
          dispatch(switchChannel({ id: defaultChannelId }));
        }
      } catch (error) {
        actions.setFieldError('request', error);
      }
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
      {formik.errors.request
      && (
        <Alert variant="danger">
          Connection problem
        </Alert>
      )}
      <Modal.Footer>
        <Button variant="secondary" type="button" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" type="submit" ref={deleteButtonRef} disabled={formik.isSubmitting}>
          {formik.isSubmitting ? (
            <Spinner animation="border" role="status" variant="light" size="sm" />
          ) : (
            'Delete'
          )}
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default RemoveChannel;
