import React, { useState } from 'react';

import AuthContext from '../contexts/AuthContext.jsx';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ logIn: setUser, logOut, user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
