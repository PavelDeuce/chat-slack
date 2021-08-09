import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import pagesRoutes from '../pages/routes.js';
import AuthProvider from '../components/AuthProvider.jsx';
import PrivateRoute from '../components/PrivateRoute.jsx';
import ModalContainer from './Modals/index.jsx';
import Header from './Header/Header.jsx';

const App = () => {
  const { kind } = useSelector((state) => state.modalsState.modal);

  const renderModal = (kindOfModal) => {
    if (!kindOfModal) return null;
    return <ModalContainer kind={kindOfModal} />;
  };

  return (
    <Suspense fallback={<Spinner animation="border" />}>
      <AuthProvider>
        <Router>
          <div className="d-flex flex-column h-100">
            <Header />
            <Switch>
              {pagesRoutes.map(({ path, isPrivate, Component }) =>
                isPrivate ? (
                  <PrivateRoute key={path} path={path} exact>
                    <Suspense fallback={<Spinner animation="border" />}>
                      <Component />
                    </Suspense>
                  </PrivateRoute>
                ) : (
                  <Route key={path} path={path}>
                    <Suspense fallback={<Spinner animation="border" />}>
                      <Component />
                    </Suspense>
                  </Route>
                )
              )}
            </Switch>
            {renderModal(kind)}
          </div>
        </Router>
      </AuthProvider>
    </Suspense>
  );
};

export default App;
