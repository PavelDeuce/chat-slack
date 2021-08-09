export default {
  translation: {
    chatSlack: 'Chat Slack',
    modules: {
      about: 'About',
    },
    languages: {
      ru: 'Russian',
      en: 'English',
      switchIcon: 'Switch language to {{ value }}',
    },
    about: {
      headline: 'About the App',
      text:
        'The final project in the profession "Front-end developer" of the online school Hexlet. Chat Slack is a real-time React/Redux application using AJAX, REST, websockets, React (with hooks) + Redux (@reduxjs/toolkit) + Formik',
      rights: 'All rights reserved',
      imageAlt: 'Online school logo',
    },
    logIn: {
      logIn: 'Log In',
      signUp: 'Sign up',
      imageAlt: 'Log In image',
      newToChat: 'New to chat?',
      form: {
        username: 'Username',
        password: 'Password',
        submit: 'Submit',
        authFailed: 'Username or password is incorrect',
      },
    },
    signUp: {
      signUp: 'Sign Up',
      logIn: 'Log In',
      imageAlt: 'Sign up image',
      existAcc: 'Already have an account?',
      form: {
        username: 'Username',
        password: 'Password',
        confirmPassword: 'Confirm password',
        submit: 'Submit',
      },
    },
    logout: 'Logout',
    channels: {
      channels: 'Channels',
      remove: 'Remove',
      rename: 'Rename',
    },
    chat: {
      messages: '{{ count }} message',
      messages_plural: '{{ count }} messages',
      send: 'Send',
    },
    modals: {
      add: 'Add channel',
      rename: 'Rename channel',
      remove: 'Remove channel',
      cancel: 'Cancel',
      submit: 'Submit',
      confirmation: 'Do you want to delete a channel with name',
      confirm: 'Confirm',
      form: {
        placeholder: 'Channel name',
        required: 'Required',
        min: 'Must be 3 to 20 characters',
        max: 'Must be 3 to 20 characters',
        uniq: 'Must be unique',
      },
    },
    errors: {
      connection: 'Connection problem',
    },
  },
};
