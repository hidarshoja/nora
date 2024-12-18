import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <Outlet />
      <Toaster
        position="top-left"
        reverseOrder={false}
      />
    </div>
  );
};

export default AuthLayout;