import axios from 'axios';

import routes from './routes';

const addChannel = (name) => axios.post(routes.channelsPath(), { data: { name } });

const removeChannel = (channelId) => axios.delete(routes.channelPath(channelId));

const updateChannel = (channelId, name) => axios.patch(
  routes.channelPath(channelId),
  { data: { name } },
);

const addMessageToChannel = (channelId, attributes) => axios.post(
  routes.channelMessagesPath(channelId),
  { data: { attributes } },
);

export {
  addChannel,
  removeChannel,
  updateChannel,
  addMessageToChannel,
};
