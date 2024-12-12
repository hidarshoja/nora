import { createBrowserRouter } from 'react-router-dom';
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
import Orders from './pages/Orders';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <AboutUs /> },
      { path: '/contact', element: <ContactUs /> },
      { path: '/shop', element: <Shop /> },
      { path: '/shop/:productId', element: <ProductDetails /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/blog', element: <BlogPage /> },
      { path: '/blog/:id', element: <BlogDetail /> },
      { path: '/question', element: <Question /> },
      { path: '/blocking', element: <Blocking /> },
      { path: '/checkOut', element: <CheckOut /> },
    ]
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
    ]
  },


  {
    path: 'admin/dashboard',
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <Dashboord />,
      },
      {
        path: 'orders',
        element: <Orders />,
      }
    ]
  }
])