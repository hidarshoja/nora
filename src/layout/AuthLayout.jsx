import { useAtomValue } from 'jotai';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Outlet } from 'react-router-dom';
import { userProfile } from '../stores/store';

const AuthLayout = () => {
  const profile = useAtomValue(userProfile)
  const token = localStorage.getItem('ACCESS_TOKEN')

  if (profile && profile?.role === "user" && token) {
    return <Navigate to='/user/home/main' />
  }else if(profile && profile?.role === "admin" && token) {
    return <Navigate to='/admin/dashboard/home' />
  }



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