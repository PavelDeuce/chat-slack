/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialModalState = {
  modal: {
    data: null,
    isOpen: false,
    kind: null,
  },
};

const modals = createSlice({
  name: 'modals',
  initialState: {
    modal: initialModalState,
  },
  reducers: {
    openModal(draftState, action) {
      const { data, kind } = action.payload;
      draftState.modal.data = data;
      draftState.modal.isOpen = true;
      draftState.modal.kind = kind;
    },
    hideModal(draftState) {
      draftState.modal = initialModalState;
    },
  },
});

const { actions, reducer } = modals;

export const { openModal, hideModal } = actions;

export default reducer;
