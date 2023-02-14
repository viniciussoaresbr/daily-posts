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
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const ProtectedRoutes = () => {
  const authToken = localStorage.getItem('token');

  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

const UnprotectedRoutes = () => {
  const authToken = localStorage.getItem('token');

  return authToken ? <Navigate to="/" /> : <Outlet />;
};

const RouteManager = () => {
  return (
    <Router>
      <AuthProvider>
        <PostProvider>
          <UserProvider>
            <Header />
            <Routes>
              <Route path="/" element={<ProtectedRoutes />}>
                <Route path="/" element={<Home />} />
              </Route>

              <Route path="/" element={<UnprotectedRoutes />}>
                <Route path="/login" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
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
