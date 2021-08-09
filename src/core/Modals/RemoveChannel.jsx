import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Form, Modal, Spinner, Alert } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import useFocus from '../../hooks/useFocus.jsx';
import useApi from '../../hooks/useApi.jsx';
import { actions as chatActions } from '../../store/index.js';
import { defaultChannelId } from '../../constants.js';

const RemoveChannel = ({ onHide, data }) => {
  const dispatch = useDispatch();
  const { removeChannel } = useApi();
  const { t } = useTranslation();
  const { id, name } = data;
  const { currentChannelId } = useSelector((state) => state.channelsState);
  const [deleteButtonRef, setDeleteButtonFocus] = useFocus();

  useEffect(() => {
    setDeleteButtonFocus();
  });

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values, actions) => {
      try {
        await removeChannel({ id });
        onHide();

        if (id === currentChannelId) {
          dispatch(chatActions.switchChannel({ id: defaultChannelId }));
        }
      } catch (error) {
        actions.setFieldError('request', error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Header>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
        <Button type="button" className="close" onClick={onHide}>
          ×
        </Button>
      </Modal.Header>
      <Modal.Body>
        {t('modals.confirmation')}
        {' - '}
        {name}
        {'?'}
      </Modal.Body>
      {formik.errors.request && <Alert variant="danger">{t('errors.connection')}</Alert>}
      <Modal.Footer>
        <Button variant="secondary" type="button" onClick={onHide}>
          {t('modals.cancel')}
        </Button>
        <Button variant="danger" type="submit" ref={deleteButtonRef} disabled={formik.isSubmitting}>
          {formik.isSubmitting ? (
            <Spinner animation="border" role="status" variant="light" size="sm" />
          ) : (
            t('modals.confirm')
          )}
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default RemoveChannel;
