// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import UsernameContext from './utils/UsernameContext';
import store from './store';
import { addMessage } from './store/messagesSlice';
import {
  addChannel, removeChannel, renameChannel,
} from './store/channelsSlice';
import { socketEvents } from './utils/appConstants';
import getUserName from './utils/usernameCookies';
import openSocket from './utils/openSocket';
import '../assets/application.scss';

const userName = getUserName();
const socket = openSocket();

socket.on(socketEvents.newMessage, ({ data }) => {
  store.dispatch(addMessage({ newMessage: data.attributes }));
});
socket.on(socketEvents.newChannel, ({ data }) => {
  store.dispatch(addChannel({ newChannel: data.attributes }));
});
socket.on(socketEvents.renameChannel, ({ data }) => {
  store.dispatch(renameChannel({ id: data.id, name: data.attributes.name }));
});
socket.on(socketEvents.removeChannel, ({ data }) => {
  store.dispatch(removeChannel({ id: data.id }));
});

ReactDOM.render(
  <Provider store={store}>
    <UsernameContext.Provider value={userName}>
      <App />
    </UsernameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
