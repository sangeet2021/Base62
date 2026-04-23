import type { RouteObject } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Landing from './pages/Landing/Landing';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import MainLayout from './components/layouts/MainLayout';
import Links from './pages/Links/Links';
import Analytics from './pages/Analytics/Analytics';
import Settings from './pages/Settings/Settings';

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
    path: '/dashboard',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'links', element: <Links /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
];
