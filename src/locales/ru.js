export default {
  translation: {
    chatSlack: 'Chat Slack',
    modules: {
      about: 'О приложении',
    },
    languages: {
      ru: 'Русский',
      en: 'Английский',
      switchIcon: 'Сменить язык на {{ value }}',
    },
    about: {
      headline: 'О приложении',
      text:
        'Итоговый проект в профессии "Фронтенд разработчик" онлайн школы Хекслет. Chat Slack - real-time приложение на React/Redux, использующее AJAX, REST, websockets, React (с хуками) + Redux (@reduxjs/toolkit) + Formik',
      rights: 'Все права защищены',
      imageAlt: 'Логотип онлайн школы',
    },
    logIn: {
      logIn: 'Войти',
      signUp: 'Регистрация',
      imageAlt: 'Изображение авторизации',
      newToChat: 'Нет аккаунта?',
      form: {
        username: 'Имя пользователя',
        password: 'Пароль',
        submit: 'Отправить',
        authFailed: 'Имя пользователя или пароль некорректны',
      },
    },
    signUp: {
      signUp: 'Регистрация',
      logIn: 'Войти',
      imageAlt: 'Изображение регистрации',
      existAcc: 'Есть аккаут?',
      form: {
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтверждение пароля',
        submit: 'Отправить',
      },
    },
    logout: 'Выйти',
    channels: {
      channels: 'Каналы',
      remove: 'Удалить',
      rename: 'Переименовать',
    },
    chat: {
      messages: '{{ count }} сообщений',
      messages_0: '{{ count }} сообщение',
      messages_1: '{{ count }} сообщения',
      send: 'Отправить',
    },
    modals: {
      add: 'Добавить канал',
      rename: 'Переименовать канал',
      remove: 'Удалить канал',
      cancel: 'Отменить',
      submit: 'Отправить',
      confirmation: 'Вы точно желаете удалить канал с именем',
      confirm: 'Удалить',
      form: {
        placeholder: 'Имя канала',
        required: 'Обязательное поле',
        min: 'От 3 до 20 символов',
        max: 'От 3 до 20 символов',
        uniq: 'Должно быть уникальным',
      },
    },
    errors: {
      connection: 'Ошибка соединения',
    },
  },
};
