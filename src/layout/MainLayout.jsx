import React, { useEffect } from 'react';
import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [pathname]);

  return (
    <div className="main-layout">
      <HeaderComponent />
      <main className="content">
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
