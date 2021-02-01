import axios from 'axios';

import routes from './routes';
import transformDataForServer from './utils/transformDataForServer';

const addChannel = (name) => axios.post(routes.channelsPath(), transformDataForServer({ name }));

const removeChannel = (channelId) => axios.delete(routes.channelPath(channelId));

const updateChannel = (channelId, name) => axios.patch(
  routes.channelPath(channelId), transformDataForServer({ name }),
);

const addMessageToChannel = (channelId, attributes) => axios.post(
  routes.channelMessagesPath(channelId), transformDataForServer({ ...attributes }),
);

export {
  addChannel, removeChannel, updateChannel, addMessageToChannel,
};
