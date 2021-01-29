import { createSlice } from '@reduxjs/toolkit';

const modals = createSlice({
  name: 'modals',
  initialState: {
    modalState: {
      data: {},
      isOpen: false,
      kind: '',
    },
  },
  reducers: {
    openModal(draftState, action) {
      const { data, kind } = action.payload;
      draftState.modalState.data = data;
      draftState.modalState.isOpen = true;
      draftState.modalState.kind = kind;
    },
    hideModal(draftState) {
      draftState.modalState = {
        data: {},
        isOpen: false,
        kind: '',
      };
    },
  },
});

const { actions, reducer } = modals;

export const { openModal, hideModal } = actions;

export default reducer;
