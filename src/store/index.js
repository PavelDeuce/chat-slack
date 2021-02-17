import { configureStore } from '@reduxjs/toolkit';
import gon from 'gon';

import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';
import modalsReducer from './modalsSlice';

const reducer = {
  messagesState: messagesReducer,
  channelsState: channelsReducer,
  modalsState: modalsReducer,
};

const { messages, channels, currentChannelId } = gon;

const store = configureStore({
  reducer,
  preloadedState: {
    messagesState: {
      messages,
    },
    channelsState: {
      channels,
      currentChannelId,
    },
  },
});

export default store;
