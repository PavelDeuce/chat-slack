// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import ReactDOM from 'react-dom';
import socketClient from 'socket.io-client';

import '../assets/application.scss';
import init from './init';

const app = async () => {
  const chat = document.getElementById('chat');
  const socket = socketClient();
  const virtualDom = await init(socket);
  ReactDOM.render(virtualDom, chat);
};

app();
