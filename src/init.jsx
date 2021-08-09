import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import App from './core/App.jsx';
import AuthContext from './contexts/AuthContext.jsx';
import ApiContext from './contexts/ApiContext.jsx';
import getUserName from './utils/usernameCookies.js';
import store, { actions } from './store/index.js';
import resources from './locales/index.js';
import { socketEvents } from './constants.js';

const init = async (socket) => {
  const username = getUserName();
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({ resources, fallbackLng: 'ru' });

  const withAcknowledgement = (socketFunc) => (...args) =>
    new Promise((resolve, reject) => {
      // eslint-disable-next-line functional/no-let
      let state = 'pending';
      const timer = setTimeout(() => {
        state = 'rejected';
        reject();
      }, 3000);

      socketFunc(...args, (response) => {
        if (state !== 'pending') return;

        clearTimeout(timer);

        if (response.status === 'ok') {
          state = 'resolved';
          resolve(response.data);
        }

        reject();
      });
    });

  const api = {
    sendMessage: withAcknowledgement((...args) => socket.emit(socketEvents.newMessage, ...args)),
    createChannel: withAcknowledgement((...args) => socket.emit(socketEvents.newChannel, ...args)),
    renameChannel: withAcknowledgement((...args) =>
      socket.emit(socketEvents.renameChannel, ...args)
    ),
    removeChannel: withAcknowledgement((...args) =>
      socket.emit(socketEvents.removeChannel, ...args)
    ),
  };

  socket.on(socketEvents.newMessage, (payload) => {
    store.dispatch(actions.addMessage(payload));
  });
  socket.on(socketEvents.newChannel, (payload) => {
    store.dispatch(actions.addChannel(payload));
  });
  socket.on(socketEvents.renameChannel, (payload) => {
    store.dispatch(actions.renameChannel({ id: payload.id, name: payload.name }));
  });
  socket.on(socketEvents.removeChannel, (payload) => {
    store.dispatch(actions.removeChannel(payload));
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthContext.Provider value={username}>
          <ApiContext.Provider value={api}>
            <App />
          </ApiContext.Provider>
        </AuthContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
