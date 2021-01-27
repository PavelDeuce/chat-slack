import { configureStore } from '@reduxjs/toolkit';

import messagesReducer from './messagesSlice';

const { messages } = window.gon;

const store = configureStore({
  reducer: messagesReducer,
  preloadedState: {
    messages: {
      data: messages,
    },
  },
});

export default store;
