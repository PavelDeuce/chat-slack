import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { addChannel } from '../../service';
import UseFocus from '../../utils/UseFocus';
import { switchChannel } from '../../store/channelsSlice';

const AddChannel = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { onHide } = props;
  const { channels } = useSelector((state) => state.channelsState);
  const channelsNames = channels.map((ch) => ch.name);
  const [inputRef, setInputFocus] = UseFocus();

  useEffect(() => {
    setInputFocus();
  }, [setInputFocus]);

  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    validationSchema: Yup.object({
      channel: Yup.string().trim().required('required').notOneOf(channelsNames, 'exist'),
    }),
    onSubmit: async (values, actions) => {
      const { channel: name } = values;

      try {
        const { data } = await addChannel(name);
        actions.resetForm();
        onHide();
        dispatch(switchChannel({ id: data.data.id }));
      } catch (error) {
        actions.setFieldError('request', error);
      }
    },
  });

  const isDisabledButton = formik.isSubmitting || formik.errors.channel;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Header>
        <Modal.Title>{t('modals.add')}</Modal.Title>
        <Button type="button" className="close" onClick={onHide}>
          ×
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          placeholder={t('modals.form.placeholder')}
          name="channel"
          className="formControl"
          value={formik.values.channel}
          onChange={formik.handleChange}
          ref={inputRef}
          isInvalid={formik.errors.channel || formik.errors.request}
        />
        {formik.errors.channel === 'required' && (
          <Form.Control.Feedback type="invalid">{t('modals.form.required')}</Form.Control.Feedback>
        )}
        {formik.errors.channel === 'exist' && (
          <Form.Control.Feedback type="invalid">{t('modals.form.uniq')}</Form.Control.Feedback>
        )}
        {formik.errors.request && (
          <Form.Control.Feedback type="invalid">{t('errors.connection')}</Form.Control.Feedback>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" type="button" onClick={onHide}>
          {t('modals.cancel')}
        </Button>
        <Button variant="primary" type="submit" disabled={isDisabledButton}>
          {formik.isSubmitting ? (
            <Spinner animation="border" role="status" variant="light" size="sm" />
          ) : (
            t('modals.submit')
          )}
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default AddChannel;
