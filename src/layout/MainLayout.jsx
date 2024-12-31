import React, { useEffect } from 'react';
import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { userProfile } from '../stores/store';
import { checkAuth } from '../utils/auth';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '../hooks/useCart';

const MainLayout = () => {
  const { pathname } = useLocation();
  const profile = useAtomValue(userProfile)
  const setUser = useSetAtom(userProfile);


  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [pathname]);



  useEffect(() => {
    const fetchAuth = async () => {
      if (!profile) await checkAuth(setUser); // Call the checkAuth function
    };
    fetchAuth();
  }, [profile]);

  return (
    <div className="main-layout">
      <CartProvider>
        <HeaderComponent />
        <main className="content">
          <Outlet />
        </main>
        <FooterComponent />
      </CartProvider>
      <Toaster
        position="top-left"
        reverseOrder={false}
      />
    </div>
  );
};

export default MainLayout;
