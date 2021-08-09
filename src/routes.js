// @ts-check

const apiPath = '/api/v1';

export default {
  logInPath: () => [apiPath, 'login'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  chatPagePath: () => '/',
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
  aboutPagePath: () => '/about',
};
