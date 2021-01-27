import { createSlice } from '@reduxjs/toolkit';

const messages = createSlice({
  name: 'messages',
  initialState: {
    data: [],
  },
  reducers: {
    addMessage(state, action) {
      const { newMessage } = action.payload;
      state.messages.data.push(newMessage);
    },
  },
});

const { actions, reducer } = messages;

export const {
  addMessage,
} = actions;

export default reducer;
