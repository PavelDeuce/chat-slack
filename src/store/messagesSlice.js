import { createSlice } from '@reduxjs/toolkit';

const messages = createSlice({
  name: 'messages',
  initialState: {
    data: [],
  },
  reducers: {
    addMessage(draftState, action) {
      const { newMessage } = action.payload;
      draftState.data.push(newMessage);
    },
  },
});

const { actions, reducer } = messages;

export const {
  addMessage,
} = actions;

export default reducer;
