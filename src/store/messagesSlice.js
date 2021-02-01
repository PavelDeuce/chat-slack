import { createSlice } from '@reduxjs/toolkit';

import { reducerNames } from '../utils/appConstants';
import { removeChannel } from './channelsSlice';

const messages = createSlice({
  name: reducerNames.messages,
  initialState: {
    data: [],
  },
  reducers: {
    addMessage(draftState, action) {
      const { newMessage } = action.payload;
      draftState.data.push(newMessage);
    },
  },
  extraReducers: {
    [removeChannel](draftState, actions) {
      const { id } = actions.payload;
      draftState.data = draftState.data.filter((message) => message.channelId !== id);
    },
  },
});

const { actions, reducer } = messages;

export const { addMessage } = actions;

export default reducer;
