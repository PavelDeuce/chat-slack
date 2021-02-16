import gon from 'gon';

const defaultChannelId = gon.currentChannelId;

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

export {
  defaultChannelId, cookiesParams, modalKinds, socketEvents,
};
