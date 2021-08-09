/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { defaultChannelId } from '../constants.js';

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: defaultChannelId,
  },
  reducers: {
    setInitialState(state, { payload }) {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    switchChannel(draftState, action) {
      const { id } = action.payload;
      draftState.currentChannelId = id;
    },
    addChannel(draftState, action) {
      const newChannel = action.payload;
      draftState.channels.push(newChannel);
      draftState.currentChannelId = newChannel.id;
    },
    renameChannel(draftState, action) {
      const { id, name } = action.payload;
      const channel = draftState.channels.find((ch) => ch.id === id);
      channel.name = name;
    },
    removeChannel(draftState, action) {
      const { id } = action.payload;
      draftState.channels = draftState.channels.filter((ch) => ch.id !== id);

      if (draftState.currentChannelId === id) {
        draftState.currentChannelId = defaultChannelId;
      }
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
