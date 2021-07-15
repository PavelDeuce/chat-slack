import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import App from './components/App';
import UsernameContext from './contexts/UsernameContext';
import getUserName from './utils/usernameCookies';
import store from './store/index';
import resources from './locales';
import { socketEvents } from './constants';
import { addMessage } from './store/messagesSlice';
import { addChannel, removeChannel, renameChannel } from './store/channelsSlice';

const init = async (socket) => {
  const username = getUserName();
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({ resources, fallbackLng: 'en' });

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

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <UsernameContext.Provider value={username}>
          <App />
        </UsernameContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
