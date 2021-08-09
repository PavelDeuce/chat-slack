// import { lazy } from 'react';
// Component: lazy(() => import('./LogIn/LogIn.jsx')),

import LogIn from './LogIn/index.jsx';
import SignUp from './SignUp/index.jsx';
import Chat from './Chat/index.jsx';
import About from './About/index.jsx';

import routes from '../routes.js';

export default [
  {
    path: routes.chatPagePath(),
    isPrivate: true,
    title: null,
    Component: Chat,
  },
  {
    path: routes.aboutPagePath(),
    isPrivate: false,
    title: 'modules.about',
    Component: About,
  },
  {
    path: routes.loginPagePath(),
    isPrivate: false,
    title: null,
    Component: LogIn,
  },
  {
    path: routes.signupPagePath(),
    isPrivate: false,
    title: null,
    Component: SignUp,
  },
];
