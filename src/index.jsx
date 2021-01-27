// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import gon from 'gon';

import App from './components/App';
import UsernameContext from './utils/UsernameContext';
import store from './store';
import { addMessage } from './store/messagesSlice';
import userName from './utils/usernameCookies';

import '../assets/application.scss';

io()
  .on('newMessage', ({ data }) => {
    store.dispatch(addMessage({ newMessage: data.attributes }));
  });

ReactDOM.render(
  <Provider store={store}>
    <UsernameContext.Provider value={userName}>
      <App channels={gon.channels} />
    </UsernameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
