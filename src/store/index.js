import { configureStore } from '@reduxjs/toolkit';
import gon from 'gon';

import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';
import modalsReducer from './modalsSlice';

const reducer = {
  messages: messagesReducer,
  channels: channelsReducer,
  modals: modalsReducer,
};

const { messages, channels, currentChannelId } = gon;

const store = configureStore({
  reducer,
  preloadedState: {
    messages: {
      messages,
    },
    channels: {
      channels,
      currentChannelId,
    },
  },
});

export default store;
