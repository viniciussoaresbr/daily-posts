import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AuthProvider from '../contexts/Auth';
import PostProvider from '../contexts/Post';
import UserProvider from '../contexts/User';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { ROUTES } from './routes';

const ProtectedRoutes = () => {
  const authToken = localStorage.getItem('token');

  return authToken ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

const UnprotectedRoutes = () => {
  const authToken = localStorage.getItem('token');

  return authToken ? <Navigate to={ROUTES.HOME} /> : <Outlet />;
};

const RouteManager = () => {
  return (
    <Router>
      <AuthProvider>
        <PostProvider>
          <UserProvider>
            <Header />
            <Routes>
              <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
              <Route path={ROUTES.HOME} element={<ProtectedRoutes />}>
                <Route path={ROUTES.HOME} element={<Home />} />
              </Route>

              <Route path={ROUTES.HOME} element={<UnprotectedRoutes />}>
                <Route path={ROUTES.LOGIN} element={<SignIn />} />
                <Route path={ROUTES.SIGNUP} element={<SignUp />} />
              </Route>
            </Routes>
            <Footer />
          </UserProvider>
        </PostProvider>
      </AuthProvider>
    </Router>
  );
};

export default RouteManager;
