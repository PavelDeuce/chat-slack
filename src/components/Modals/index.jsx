import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import AddChannel from './AddChannel';
import RenameChannel from './RenameChannel';
import RemoveChannel from './RemoveChannel';
import { hideModal } from '../../store/modalsSlice';

const modalsMap = {
  addChannel: AddChannel,
  renameChannel: RenameChannel,
  removeChannel: RemoveChannel,
};

const ModalContainer = (props) => {
  const dispatch = useDispatch();
  const { kind } = props;
  const { data, isOpen } = useSelector((state) => state.modals.modalState);
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
