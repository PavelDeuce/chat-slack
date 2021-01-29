import { createSlice } from '@reduxjs/toolkit';

const channels = createSlice({
  name: 'channels',
  initialState: {
    data: [],
  },
  reducers: {
    switchChannel(draftState, action) {
      const { id } = action.payload;
      draftState.currentChannelId = id;
    },
    addChannel(draftState, action) {
      const { newChannel } = action.payload;
      draftState.data.push(newChannel);
    },
  },
});

const { actions, reducer } = channels;

export const {
  switchChannel,
  addChannel,
} = actions;

export default reducer;
