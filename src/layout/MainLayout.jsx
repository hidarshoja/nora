import React from 'react';
import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <HeaderComponent />
      <main className="content">
        {children}
      </main>
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
