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
    renameChannel(draftState, action) {
      const { id, name } = action.payload;
      const index = draftState.data.findIndex((item) => item.id === id);
      const channel = draftState.data[index];
      draftState.data[index] = {
        ...channel,
        name,
      };
    },
    removeChannel(draftState, action) {
      const { id } = action.payload;
      draftState.data = draftState.data.filter((item) => item.id !== id);

      if (id === draftState.currentChannelId) {
        draftState.currentChannelId = null;
      }
    },
  },
});

const { actions, reducer } = channels;

export const { switchChannel, addChannel, renameChannel, removeChannel } = actions;

export default reducer;
