/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { removeChannel } from './channelsSlice';

const messages = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(draftState, action) {
      const { newMessage } = action.payload;
      draftState.messages.push(newMessage);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (draftState, actions) => {
      const { id } = actions.payload;
      draftState.messages = draftState.messages.filter((message) => message.channelId !== id);
    });
  },
});

const { actions, reducer } = messages;

export const { addMessage } = actions;

export default reducer;
