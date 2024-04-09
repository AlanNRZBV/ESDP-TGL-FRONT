import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../containers/home/Home';
import Register from '../features/users/Register';
import Login from '../features/users/Login';
import { appRoutes } from '../utils/constants';
import UserProfile from '../features/users/UserProfile';

export const router = createBrowserRouter([
  {
    path: appRoutes.home,
    element: <Layout />,
    children: [
      {
        path: appRoutes.home,
        element: <Home />,
      },
      {
        path: appRoutes.register,
        element: <Register />,
      },
      {
        path: appRoutes.login,
        element: <Login />,
      },
      {
        path: appRoutes.profile,
        element: <UserProfile />,
      },
    ],
  },
]);
