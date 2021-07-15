import gon from 'gon';
import { configureStore } from '@reduxjs/toolkit';

import messagesReducer, { actions as messagesActions } from './messagesSlice';
import channelsReducer, { actions as channelsActions } from './channelsSlice';
import modalsReducer, { actions as modalActions } from './modalsSlice';

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

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};

export default store;
export { actions };
export * from './selectors';
