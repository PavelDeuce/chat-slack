// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

import '../assets/application.scss';

import gon from 'gon';

import App from './components/App';

ReactDOM.render(
  <App channels={gon.channels} messages={gon.messages} />,
  document.getElementById('chat'),
);
