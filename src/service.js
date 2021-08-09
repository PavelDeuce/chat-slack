import axios from 'axios';

import routes from './routes.js';
import getAuthHeader from './utils/getAuthHeader.js';

const logIn = (logInData) => {
  return axios.post(routes.logInPath(), logInData);
};

const signUp = (signUpData) => {
  return axios.post(routes.signUpPath(), signUpData);
};

const getChatData = () => {
  return axios.get(routes.dataPath(), { headers: getAuthHeader() });
};

export { getChatData, logIn, signUp };
