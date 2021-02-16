/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { defaultChannelId } from '../utils/appConstants';

const channels = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: defaultChannelId,
  },
  reducers: {
    switchChannel(draftState, action) {
      const { id } = action.payload;
      draftState.currentChannelId = id;
    },
    addChannel(draftState, action) {
      const { newChannel } = action.payload;
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
    },
  },
});

const { actions, reducer } = channels;

export const {
  switchChannel, addChannel, renameChannel, removeChannel,
} = actions;

export default reducer;
