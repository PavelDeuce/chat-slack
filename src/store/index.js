import { configureStore } from '@reduxjs/toolkit';

import { reducerNames } from '../utils/appConstants';
import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';
import modalsReducer from './modalsSlice';

const reducer = {
  [reducerNames.messages]: messagesReducer,
  [reducerNames.channels]: channelsReducer,
  [reducerNames.modals]: modalsReducer,
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
