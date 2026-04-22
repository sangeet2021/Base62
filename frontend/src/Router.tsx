import type { RouteObject } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Landing from './pages/Landing/Landing';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';

export const routes: RouteObject[] = [
  { path: '/', element: <Landing /> },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/home',
    element: <Dashboard />,
  },
];
