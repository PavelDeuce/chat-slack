import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';

import { addMessageToChannel } from '../../service';
import UsernameContext from '../../utils/UsernameContext';

const MessageForm = () => {
  const username = useContext(UsernameContext);
  const { currentChannelId } = useSelector((state) => state.channels);

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: async (values) => {
      const attributes = {
        body: values.message,
        username,
        date: new Date(),
      };

      await addMessageToChannel(currentChannelId, attributes);
      formik.resetForm();
    },
  });

  return (
    <div className="mt-auto mb-1">
      <form className="input-form-group" onSubmit={formik.handleSubmit}>
        <FormControl value={formik.values.message} onChange={formik.handleChange} name="message" type="text" className="mr-2 form-control" />
        <Button type="submit" className="btn btn-primary">Submit</Button>
      </form>
    </div>
  );
};

export default MessageForm;
