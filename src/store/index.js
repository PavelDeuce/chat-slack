import { configureStore } from '@reduxjs/toolkit';

import messagesReducer, { actions as messagesActions } from './messagesSlice.js';
import channelsReducer, { actions as channelsActions } from './channelsSlice.js';
import modalsReducer, { actions as modalActions } from './modalsSlice.js';

const reducer = {
  messagesState: messagesReducer,
  channelsState: channelsReducer,
  modalsState: modalsReducer,
};

const store = configureStore({
  reducer,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};

export default store;
export { actions };
export * from './selectors.js';
