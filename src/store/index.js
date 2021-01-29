import { configureStore } from '@reduxjs/toolkit';

import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';
import modalsReducer from './modalsSlice';

const reducer = {
  messages: messagesReducer,
  channels: channelsReducer,
  modals: modalsReducer,
};

const { messages, channels } = window.gon;

const store = configureStore({
  reducer,
  preloadedState: {
    messages: {
      data: messages,
    },
    channels: {
      data: channels,
      currentChannelId: 1,
    },
  },
});

export default store;
