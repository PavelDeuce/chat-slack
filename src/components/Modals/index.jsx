import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import AddChannel from './AddChannel';
import RenameChannel from './RenameChannel';
import RemoveChannel from './RemoveChannel';
import { hideModal } from '../../store/modalsSlice';
import { modalKinds } from '../../utils/appConstants';

const modalsMap = {
  [modalKinds.addChannel]: AddChannel,
  [modalKinds.renameChannel]: RenameChannel,
  [modalKinds.removeChannel]: RemoveChannel,
};

const ModalContainer = (props) => {
  const dispatch = useDispatch();
  const { kind } = props;
  const { data, isOpen } = useSelector((state) => state.modalsState.modal);
  const onHide = () => dispatch(hideModal());
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
