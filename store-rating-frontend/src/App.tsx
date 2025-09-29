import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AdminDashboard from './components/admin/AdminDashboard';
import StoreManagement from './components/admin/StoreManagement';
import UserManagement from './components/admin/UserManagement';
import UserDashboard from './components/user/UserDashboard';
import StoreOwnerDashboard from './components/store-owner/StoreOwnerDashboard';
import StoreList from './components/user/StoreList';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles: string[] }> = ({ children, allowedRoles }) => {
  const role = localStorage.getItem('role');
  return role && allowedRoles.includes(role) ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin"
          element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>}
        />
        <Route
          path="/admin/stores"
          element={<ProtectedRoute allowedRoles={['admin']}><StoreManagement /></ProtectedRoute>}
        />
        <Route
          path="/admin/users"
          element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>}
        />
        <Route
          path="/user"
          element={<ProtectedRoute allowedRoles={['user']}><UserDashboard /></ProtectedRoute>}
        />
        <Route
          path="/stores"
          element={<ProtectedRoute allowedRoles={['user']}><StoreList /></ProtectedRoute>}
        />
        <Route
          path="/store-owner"
          element={<ProtectedRoute allowedRoles={['store_owner']}><StoreOwnerDashboard /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;