// import Home from './pages/Home';
// import AboutUs from './pages/AboutUs';
// import ContactUs from './pages/ContactUs';
// import Shop from './pages/Shop';
// import ProductDetails from './pages/ProductDetails';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import CartPage from './pages/Cart';
// import BlogPage from './pages/‌Blog';
// import BlogDetail from './pages/SinglePage';
// import Question from './pages/Question';
// import Blocking from './pages/Blocking';
// import CheckOut from './pages/CheckOut';
// import { createBrowserRouter } from 'react-router-dom';

// export const routes = 
//  createBrowserRouter([
//     {
//         path: '/',
//         element: <Home />,
//         layout: 'main',
//       },
//       {
//         path: '/about',
//         element: <AboutUs />,
//         layout: 'main',
//       },
//       {
//         path: '/contact',
//         element: <ContactUs />,
//         layout: 'main',
//       },
//       {
//         path: '/shop',
//         element: <Shop />,
//         layout: 'main',
//       },
//       {
//         path: '/shop/:productId',
//         element: <ProductDetails />,
//         layout: 'main',
//       },
//       {
//         path: '/cart',
//         element: <CartPage />,
//         layout: 'main',
//       },
//       {
//         path: '/blog',
//         element: <BlogPage />,
//         layout: 'main',
//       },
//       {
//         path: '/blog/:id',
//         element: <BlogDetail />,
//         layout: 'main',
//       },
//       {
//         path: '/login',
//         element: <Login />,
//         layout: 'auth',
//       },
//       {
//         path: '/register',
//         element: <Register />,
//         layout: 'auth',
//       },
//       {
//         path: '/question',
//         element: <Question />,
//         layout: 'main',
//       },
//       {
//         path: '/blocking',
//         element: <Blocking />,
//         layout: 'main',
//       },
//       {
//         path: '/checkOut',
//         element: <CheckOut />,
//         layout: 'main',
//       },
//  ])
// ;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CartPage from './pages/Cart';
import BlogPage from './pages/‌Blog';
import BlogDetail from './pages/SinglePage';
import Question from './pages/Question';
import Blocking from './pages/Blocking';
import CheckOut from './pages/CheckOut';
import Dashboord from './pages/Dashboord';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* روت لاگین و رجیستر */}
        <Route 
          path="/login" 
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } 
        />
        <Route 
          path="/register" 
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          } 
        />
      
      {/* روت سایت */}
        <Route 
          path="/" 
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          } 
        />
        <Route 
          path="/about" 
          element={
            <MainLayout>
              <AboutUs />
            </MainLayout>
          } 
        />
          <Route 
          path="/contact" 
          element={
            <MainLayout>
              <ContactUs />
            </MainLayout>
          } 
        />
          <Route 
          path="/shop" 
          element={
            <MainLayout>
              <Shop />
            </MainLayout>
          } 
        />
           <Route 
          path="/shop/:productId" 
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          } 
        />
           <Route 
          path="/cart" 
          element={
            <MainLayout>
              <CartPage />
            </MainLayout>
          } 
        />
           <Route 
          path="/blog" 
          element={
            <MainLayout>
              <BlogPage />
            </MainLayout>
          } 
        />
           <Route 
          path="/question" 
          element={
            <MainLayout>
              <Question />
            </MainLayout>
          } 
        />
            <Route 
          path='/blog/:id' 
          element={
            <MainLayout>
              <BlogDetail />
            </MainLayout>
          } 
        />
               <Route 
          path='/blocking' 
          element={
            <MainLayout>
              <Blocking />
            </MainLayout>
          } 
        />
               <Route 
          path='/checkOut' 
          element={
            <MainLayout>
              <CheckOut />
            </MainLayout>
          } 
        />
        {/* روت پنل مدیر */}
        <Route 
          path='/dashboord' 
          element={
            <AdminLayout>
              <Dashboord />
            </AdminLayout>
          } 
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
