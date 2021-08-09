/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { actions as channelsActions } from './channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(draftState, action) {
      const newMessage = action.payload;
      draftState.messages.push(newMessage);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (draftState, actions) => {
        const { id } = actions.payload;
        draftState.messages = draftState.messages.filter((message) => message.channelId !== id);
      })
      .addCase(channelsActions.setInitialState, (state, { payload }) => {
        const { messages } = payload;
        state.messages = messages;
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
