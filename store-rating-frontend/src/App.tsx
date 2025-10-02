import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from './components/user/UserDashboard';
import StoreOwnerDashboard from './components/store-owner/StoreOwnerDashboard';
import { useAuth } from './services/auth';

const App = () => {
  const { user } = useAuth();
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    console.log('App user (useEffect):', user);
    setIsInitialRender(false);
  }, [user]);

  const getRedirectPath = () => {
    console.log('getRedirectPath called, user:', user, 'isInitialRender:', isInitialRender);
    if (isInitialRender) return '/login'; // Prevent redirect on initial render
    if (!user) return '/login';
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'user':
        return '/user';
      case 'store_owner':
        return '/store-owner';
      default:
        return '/login';
    }
  };

  console.log('App user (render):', user);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/admin"
        element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/user"
        element={user?.role === 'user' ? <UserDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/store-owner"
        element={user?.role === 'store_owner' ? <StoreOwnerDashboard /> : <Navigate to="/login" />}
      />
      <Route path="/" element={<Navigate to={getRedirectPath()} replace />} />
    </Routes>
  );
};

export default App;