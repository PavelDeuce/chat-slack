/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialModalState = {
  modal: {
    data: null,
    isOpen: false,
    kind: null,
  },
};

const modalsSlice = createSlice({
  name: 'modalsInfo',
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

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
