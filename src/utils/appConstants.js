const cookiesParams = {
  userName: 'userName',
};

const modalKinds = {
  addChannel: 'addChannel',
  renameChannel: 'renameChannel',
  removeChannel: 'removeChannel',
};

const socketEvents = {
  newMessage: 'newMessage',
  newChannel: 'newChannel',
  removeChannel: 'removeChannel',
  renameChannel: 'renameChannel',
};

const reducerNames = {
  messages: 'messages',
  channels: 'channels',
  modals: 'modals',
};

export {
  cookiesParams, modalKinds, socketEvents, reducerNames,
};
