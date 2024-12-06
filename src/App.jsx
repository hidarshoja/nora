import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Blog from './pages/‌Blog';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import BlogDetail from './pages/SinglePage';
import Question from './pages/Question';
import Blocking from './pages/Blocking';

import "./App.css";

const AppContent = () => {
  const location = useLocation();
  const noHeaderFooterPages = ['/login', '/register'];

  const showHeaderFooter = !noHeaderFooterPages.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blocking" element={<Blocking />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/question" element={<Question />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <div dir='rtl' className='font-YekanBakh-Regular text-sm'>
      <Router>
        <AppContent />
      </Router>
    </div>
  );
};

export default App;
