import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import { actions, getModalsInfo } from '../../store/index.js';
import { modalKinds } from '../../constants.js';

const modalsMap = {
  [modalKinds.addChannel]: AddChannel,
  [modalKinds.renameChannel]: RenameChannel,
  [modalKinds.removeChannel]: RemoveChannel,
};

const ModalContainer = ({ kind }) => {
  const dispatch = useDispatch();
  const { data, isOpen } = useSelector(getModalsInfo);
  const onHide = () => dispatch(actions.hideModal());
  const ModalContent = modalsMap[kind];

  return (
    <>
      <Modal size="md" onHide={onHide} show={isOpen}>
        <ModalContent data={data} onHide={onHide} />
      </Modal>
    </>
  );
};

export default ModalContainer;
