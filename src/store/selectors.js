const getChannelsInfo = (state) => state.channelsState;

const getCurrentChannel = (state) => {
  const { channels, currentChannelId } = state.channelsState;
  return channels.find((c) => c.id === currentChannelId);
};

const getMessagesForCurrentChannel = (state) => {
  const { currentChannelId } = state.channelsState;
  const { messages } = state.messagesState;
  return messages.filter((m) => m.channelId === currentChannelId);
};

const getChannelsNames = (state) => {
  const { channels } = state.channelsState;
  return channels.map(({ name }) => name);
};

const getChannelById = (channelId) => (state) => {
  const { channels } = state.channelsState;
  return channels.find(({ id }) => channelId === id);
};

export {
  getChannelsInfo,
  getChannelById,
  getChannelsNames,
  getMessagesForCurrentChannel,
  getCurrentChannel,
};
