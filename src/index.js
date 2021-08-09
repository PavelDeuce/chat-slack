// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import ReactDOM from 'react-dom';
import socketClient from 'socket.io-client';

import '../assets/application.scss';
import init from './init.jsx';

const app = async () => {
  const chat = document.getElementById('chat');
  const socket = socketClient();
  const virtualDom = await init(socket);
  ReactDOM.render(virtualDom, chat);
};

app();
