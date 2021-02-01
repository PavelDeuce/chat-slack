/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { reducerNames } from '../utils/appConstants';

const initialModalState = {
  modalState: {
    data: {},
    isOpen: false,
    kind: '',
  },
};

const modals = createSlice({
  name: reducerNames.modals,
  initialState: {
    modalState: initialModalState,
  },
  reducers: {
    openModal(draftState, action) {
      const { data, kind } = action.payload;
      draftState.modalState.data = data;
      draftState.modalState.isOpen = true;
      draftState.modalState.kind = kind;
    },
    hideModal(draftState) {
      draftState.modalState = initialModalState;
    },
  },
});

const { actions, reducer } = modals;

export const { openModal, hideModal } = actions;

export default reducer;
