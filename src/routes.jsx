import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';
import PasswordRecovery from './pages/auth/PasswordRecovery';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/Cart';
import BlogPage from './pages/‌Blog';
import BlogDetail from './pages/SinglePage';
import Question from './pages/Question';
import Blocking from './pages/Blocking';
import CheckOut from './pages/CheckOut';
import Dashboord from './pages/Admin/Dashboord';
import Orders from './pages/Admin/Orders';
import Products from './pages/Admin/Products';
import Users from './pages/Admin/Users';
import Category from './pages/Admin/Category';
import BlogAdmin from './pages/Admin/BlogAdmin';
import CommentsAdmin from './pages/Admin/CommentsAdmin';
import Profile from './pages/Admin/Profile';
import Settings from './pages/Admin/Settings';
import QuestionsAdmin from './pages/Admin/Questions';
import UserLayout from './layout/UserLayout';
import HomeUser from './pages/User/HomeUser';
import OrderUser from './pages/User/OrderUser';
import CommentUser from './pages/User/CommentUser';
import TicketUser from './pages/User/TicketUser';
import ProfileUser from './pages/User/ProfileUser';
import Notifications from './pages/Admin/Notifications';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <AboutUs /> },
      { path: '/contact', element: <ContactUs /> },
      { path: '/shop', element: <Shop /> },
      { path: '/shop/:slug', element: <ProductDetails /> },
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
      {
        path: 'forget',
        element: <PasswordRecovery />
      },
    ]
  },


  {
    path: 'admin/dashboard',
    element: <AdminLayout />,
    children: [
      {
        path: 'home',
        element: <Dashboord />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'category',
        element: <Category />,
      },
      {
        path: 'blogAdmin',
        element: <BlogAdmin />,
      },
      {
        path: 'commentsAdmin',
        element: <CommentsAdmin />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'questionsAdmin',
        element: <QuestionsAdmin />,
      },
      {
        path: 'notification',
        element: <Notifications />,
      }

    ]
  },
  {
    path: 'user/home',
    element: <UserLayout />,
    children: [
      {
        path: 'main',
        element: <HomeUser />,
      },
      {
        path: 'orders',
        element: <OrderUser />,
      },
      {
        path: 'comment',
        element: <CommentUser />,
      },
      {
        path: 'ticket',
        element: <TicketUser />,
      },
      {
        path: 'profile',
        element: <ProfileUser />,
      },
     
    ]
  }
])